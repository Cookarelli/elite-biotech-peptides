import { StatusBar } from "expo-status-bar";
import { useCallback, useMemo, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  buildInvoiceDraft,
  buildInvoiceRequestPayload,
  getProductBySlug,
  products,
  PROCUREMENT_EMAIL,
  type Product,
} from "@elite-biotech/shared";
import logo from "./assets/elite-biotech-logo.png";

type TabKey = "home" | "products" | "invoices";

const heroCopy =
  "Shared catalog, manual invoice flow, and the same Elite Biotech product data as the web storefront.";
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

const demoInvoices = [
  {
    id: "INV-24001",
    status: "Draft requested",
    detail: "Tirzepatide inquiry ready for manual review",
  },
  {
    id: "INV-24002",
    status: "Awaiting PayPal invoice",
    detail: "Mixed metabolic order pending quote confirmation",
  },
  {
    id: "INV-24003",
    status: "Follow-up needed",
    detail: "Buyer requested COA detail before invoice issuance",
  },
];

export default function App() {
  const [tab, setTab] = useState<TabKey>("home");
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(products[0]?.slug ?? "");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [shipping, setShipping] = useState("");
  const [notes, setNotes] = useState("");
  const [requestStatus, setRequestStatus] = useState<string | null>(null);
  const [recentRequests, setRecentRequests] = useState<
    Array<{
      id: string;
      status: string;
      productName: string;
      createdAt: string;
    }>
  >([]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;

    return products.filter((product) => {
      const haystack =
        `${product.name} ${product.category} ${product.description} ${product.aliases?.join(" ") ?? ""}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query]);

  const selectedProduct = getProductBySlug(selectedSlug) ?? filtered[0] ?? products[0];

  const loadInvoiceRequests = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/invoice-requests`);
      if (!response.ok) return;
      const data = (await response.json()) as {
        requests?: Array<{
          id: string;
          status: string;
          productName: string;
          createdAt: string;
        }>;
      };
      setRecentRequests(data.requests ?? []);
    } catch {
      // Keep the local placeholder list if the API is not reachable.
    }
  }, []);

  async function openInvoiceDraft() {
    if (!selectedProduct) {
      Alert.alert("No product selected", "Choose a product before requesting an invoice.");
      return;
    }

    if (!fullName.trim() || !email.trim()) {
      Alert.alert("Missing info", "Add your name and email so the invoice request is usable.");
      return;
    }

    const requestInput = {
      product: selectedProduct,
      fullName,
      email,
      company,
      quantity,
      shipping,
      notes,
    };
    const draft = buildInvoiceDraft(requestInput);
    const payload = buildInvoiceRequestPayload(requestInput, "mobile");

    try {
      const response = await fetch(`${API_BASE_URL}/api/invoice-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          invoiceRequest?: { id: string };
        };
        setRequestStatus(
          data.invoiceRequest?.id
            ? `Saved as ${data.invoiceRequest.id}. Opening your email draft now.`
            : "Request saved. Opening your email draft now."
        );
        await loadInvoiceRequests();
      } else {
        setRequestStatus("Email draft will open, but the API copy was not saved.");
      }
    } catch {
      setRequestStatus("Email draft will open, but the API copy was not saved.");
    }

    const supported = await Linking.canOpenURL(draft.mailtoUrl);
    if (!supported) {
      Alert.alert(
        "Email app unavailable",
        `Send your request manually to ${PROCUREMENT_EMAIL}.`
      );
      return;
    }

    await Linking.openURL(draft.mailtoUrl);
    setTab("invoices");
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.header}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>ELITE BIOTECH PEPTIDES</Text>
          <Text style={styles.headerTitle}>Mobile storefront</Text>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TabButton label="Home" active={tab === "home"} onPress={() => setTab("home")} />
        <TabButton
          label="Products"
          active={tab === "products"}
          onPress={() => setTab("products")}
        />
        <TabButton
          label="Invoices"
          active={tab === "invoices"}
          onPress={() => {
            setTab("invoices");
            void loadInvoiceRequests();
          }}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {tab === "home" ? (
          <HomeTab
            onBrowseProducts={() => setTab("products")}
            onOpenInvoices={() => {
              setTab("invoices");
              void loadInvoiceRequests();
            }}
          />
        ) : null}

        {tab === "products" ? (
          <>
            <ProductBrowser
              query={query}
              setQuery={setQuery}
              filtered={filtered}
              selectedProduct={selectedProduct}
              onSelect={(slug) => setSelectedSlug(slug)}
              onRequestInvoice={() => {
                setTab("invoices");
                void loadInvoiceRequests();
              }}
            />
          </>
        ) : null}

        {tab === "invoices" ? (
          <InvoicesTab
            selectedProduct={selectedProduct}
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            company={company}
            setCompany={setCompany}
            quantity={quantity}
            setQuantity={setQuantity}
            shipping={shipping}
            setShipping={setShipping}
            notes={notes}
            setNotes={setNotes}
            onOpenInvoiceDraft={openInvoiceDraft}
            requestStatus={requestStatus}
            recentRequests={recentRequests}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

function HomeTab({
  onBrowseProducts,
  onOpenInvoices,
}: {
  onBrowseProducts: () => void;
  onOpenInvoices: () => void;
}) {
  return (
    <>
      <View style={styles.hero}>
        <Text style={styles.title}>Shared web + mobile experience</Text>
        <Text style={styles.heroCopy}>{heroCopy}</Text>

        <View style={styles.promoRow}>
          <PromoPill label="10% off over $100" />
          <PromoPill label="25% off over $250" />
          <PromoPill label="Free shipping tiers" subtle />
        </View>

        <View style={styles.actionRow}>
          <ActionButton label="Browse products" onPress={onBrowseProducts} />
          <SecondaryButton label="Open invoices" onPress={onOpenInvoices} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What this app is for</Text>
        <Text style={styles.sectionCopy}>
          This is the mobile companion to the Elite Biotech website. It keeps the same product data,
          invoice-first ordering, and promo messaging so updates can stay aligned across platforms.
        </Text>
      </View>
    </>
  );
}

function ProductBrowser({
  query,
  setQuery,
  filtered,
  selectedProduct,
  onSelect,
  onRequestInvoice,
}: {
  query: string;
  setQuery: (value: string) => void;
  filtered: Product[];
  selectedProduct?: Product;
  onSelect: (slug: string) => void;
  onRequestInvoice: () => void;
}) {
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Search catalog</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Try tirzepatide, repair, NAD+..."
          placeholderTextColor="#6b7280"
          style={styles.input}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productRow}
        >
          {filtered.map((product) => {
            const active = selectedProduct?.slug === product.slug;
            return (
              <Pressable
                key={product.slug}
                onPress={() => onSelect(product.slug)}
                style={[styles.productCard, active && styles.productCardActive]}
              >
                <Text style={styles.productCategory}>{product.category}</Text>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productMeta}>
                  {product.strengthMg} mg / {product.volumeMl} mL
                </Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {selectedProduct ? <SelectedProductCard product={selectedProduct} /> : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ready to order?</Text>
        <Text style={styles.sectionCopy}>
          Keep the launch flow simple. Pick a product here, then move to the Invoices tab to request
          a manual PayPal invoice.
        </Text>
        <ActionButton label="Go to invoices" onPress={onRequestInvoice} />
      </View>
    </>
  );
}

function InvoicesTab({
  selectedProduct,
  fullName,
  setFullName,
  email,
  setEmail,
  company,
  setCompany,
  quantity,
  setQuantity,
  shipping,
  setShipping,
  notes,
  setNotes,
  onOpenInvoiceDraft,
  requestStatus,
  recentRequests,
}: {
  selectedProduct?: Product;
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  company: string;
  setCompany: (value: string) => void;
  quantity: string;
  setQuantity: (value: string) => void;
  shipping: string;
  setShipping: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  onOpenInvoiceDraft: () => void;
  requestStatus: string | null;
  recentRequests: Array<{
    id: string;
    status: string;
    productName: string;
    createdAt: string;
  }>;
}) {
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Request invoice</Text>
        <Text style={styles.sectionCopy}>
          This matches the web launch flow. Submit the product details, then send the request to
          Elite Biotech so a PayPal invoice can be handled separately.
        </Text>

        {selectedProduct ? (
          <View style={styles.invoiceSelectedCard}>
            <Text style={styles.invoiceSelectedLabel}>Current selection</Text>
            <Text style={styles.invoiceSelectedName}>{selectedProduct.name}</Text>
            <Text style={styles.invoiceSelectedMeta}>
              {selectedProduct.strengthMg} mg / {selectedProduct.volumeMl} mL · {selectedProduct.price}
            </Text>
          </View>
        ) : null}

        <Field label="Full name" value={fullName} onChangeText={setFullName} />
        <Field
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Field label="Company" value={company} onChangeText={setCompany} />
        <Field label="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="number-pad" />
        <Field label="Shipping destination" value={shipping} onChangeText={setShipping} />
        <Field
          label="Product notes"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />

        <ActionButton label="Open invoice email draft" onPress={onOpenInvoiceDraft} />

        {requestStatus ? <Text style={styles.statusText}>{requestStatus}</Text> : null}

        <Text style={styles.helperText}>
          If no email app opens, send the request to {PROCUREMENT_EMAIL}.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Invoice activity</Text>
        <Text style={styles.sectionCopy}>
          This is the launch-time placeholder for invoice tracking. Once the database-backed flow is
          live, this tab can show real request history and statuses.
        </Text>

        <View style={styles.invoiceList}>
          {(recentRequests.length > 0 ? recentRequests : demoInvoices).map((invoice) => (
            <View key={invoice.id} style={styles.invoiceCard}>
              <Text style={styles.invoiceId}>{invoice.id}</Text>
              <Text style={styles.invoiceStatus}>{invoice.status}</Text>
              <Text style={styles.invoiceDetail}>
                {"detail" in invoice
                  ? invoice.detail
                  : `${invoice.productName} · ${new Date(invoice.createdAt).toLocaleString()}`}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.tabButton, active && styles.tabButtonActive]}>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </Pressable>
  );
}

function ActionButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.cta}>
      <Text style={styles.ctaText}>{label}</Text>
    </Pressable>
  );
}

function SecondaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.secondaryCta}>
      <Text style={styles.secondaryCtaText}>{label}</Text>
    </Pressable>
  );
}

function PromoPill({ label, subtle = false }: { label: string; subtle?: boolean }) {
  return (
    <View style={[styles.pill, subtle && styles.pillSubtle]}>
      <Text style={[styles.pillText, subtle && styles.pillTextSubtle]}>{label}</Text>
    </View>
  );
}

function SelectedProductCard({ product }: { product: Product }) {
  return (
    <View style={styles.selectedCard}>
      <Text style={styles.sectionTitle}>Selected product</Text>
      <Text style={styles.selectedName}>{product.name}</Text>
      <Text style={styles.selectedPrice}>{product.price}</Text>
      <Text style={styles.selectedMeta}>
        {product.strengthMg} mg / {product.volumeMl} mL · {product.category}
      </Text>
      <Text style={styles.selectedDescription}>{product.description}</Text>
    </View>
  );
}

function Field({
  label,
  value,
  onChangeText,
  multiline = false,
  numberOfLines = 1,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: "default" | "email-address" | "number-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        placeholderTextColor="#6b7280"
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={[styles.input, multiline && styles.textarea]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#040816",
  },
  header: {
    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148, 163, 184, 0.12)",
    backgroundColor: "#07101f",
  },
  headerCopy: {
    flex: 1,
  },
  headerTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 120,
    gap: 20,
  },
  logo: {
    width: 56,
    height: 56,
  },
  eyebrow: {
    color: "#7dd3fc",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.8,
  },
  tabBar: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#07101f",
  },
  tabButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 11,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.12)",
    backgroundColor: "#0b1220",
  },
  tabButtonActive: {
    borderColor: "rgba(56, 189, 248, 0.55)",
    backgroundColor: "rgba(14, 165, 233, 0.14)",
  },
  tabLabel: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: "700",
  },
  tabLabelActive: {
    color: "#e0f2fe",
  },
  hero: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.18)",
    backgroundColor: "#0b1220",
    padding: 20,
    gap: 12,
  },
  title: {
    color: "#f8fafc",
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "700",
  },
  heroCopy: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 22,
  },
  promoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  pill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    backgroundColor: "rgba(14, 165, 233, 0.12)",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pillSubtle: {
    borderColor: "rgba(148, 163, 184, 0.2)",
    backgroundColor: "rgba(15, 23, 42, 0.9)",
  },
  pillText: {
    color: "#dbeafe",
    fontSize: 12,
    fontWeight: "700",
  },
  pillTextSubtle: {
    color: "#cbd5e1",
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  section: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.14)",
    backgroundColor: "#0a1020",
    padding: 18,
    gap: 14,
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "700",
  },
  sectionCopy: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 21,
  },
  input: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.18)",
    backgroundColor: "#020617",
    color: "#f8fafc",
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
  },
  textarea: {
    minHeight: 112,
    textAlignVertical: "top",
  },
  productRow: {
    gap: 12,
    paddingRight: 10,
  },
  productCard: {
    width: 220,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.14)",
    backgroundColor: "#020617",
    padding: 16,
    gap: 8,
  },
  productCardActive: {
    borderColor: "rgba(56, 189, 248, 0.7)",
    backgroundColor: "#0c1426",
  },
  productCategory: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  productName: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "700",
  },
  productMeta: {
    color: "#cbd5e1",
    fontSize: 13,
  },
  productPrice: {
    color: "#7dd3fc",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 6,
  },
  selectedCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.2)",
    backgroundColor: "#0b1220",
    padding: 18,
    gap: 8,
  },
  selectedName: {
    color: "#f8fafc",
    fontSize: 24,
    fontWeight: "700",
  },
  selectedPrice: {
    color: "#7dd3fc",
    fontSize: 24,
    fontWeight: "700",
  },
  selectedMeta: {
    color: "#cbd5e1",
    fontSize: 14,
  },
  selectedDescription: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 22,
  },
  field: {
    gap: 8,
  },
  fieldLabel: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "700",
  },
  cta: {
    borderRadius: 18,
    backgroundColor: "#38bdf8",
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  ctaText: {
    color: "#020617",
    fontSize: 15,
    fontWeight: "800",
  },
  secondaryCta: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.2)",
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#0a1020",
  },
  secondaryCtaText: {
    color: "#e2e8f0",
    fontSize: 15,
    fontWeight: "700",
  },
  helperText: {
    color: "#94a3b8",
    fontSize: 12,
    lineHeight: 18,
  },
  statusText: {
    color: "#7dd3fc",
    fontSize: 13,
    lineHeight: 18,
  },
  invoiceSelectedCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.18)",
    backgroundColor: "#0b1220",
    padding: 14,
    gap: 6,
  },
  invoiceSelectedLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  invoiceSelectedName: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "700",
  },
  invoiceSelectedMeta: {
    color: "#cbd5e1",
    fontSize: 13,
  },
  invoiceList: {
    gap: 10,
  },
  invoiceCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.14)",
    backgroundColor: "#020617",
    padding: 14,
    gap: 4,
  },
  invoiceId: {
    color: "#f8fafc",
    fontSize: 15,
    fontWeight: "700",
  },
  invoiceStatus: {
    color: "#7dd3fc",
    fontSize: 13,
    fontWeight: "700",
  },
  invoiceDetail: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 18,
  },
});
