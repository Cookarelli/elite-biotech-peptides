import { StatusBar } from "expo-status-bar";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView, type WebViewNavigation } from "react-native-webview";
import logo from "./assets/elite-biotech-logo.png";

const APP_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://www.elitebiotechpeptides.com";
const COMPANY_NAME =
  process.env.EXPO_PUBLIC_COMPANY_NAME ?? "Elite Biotech Peptides";

const INTERNAL_HOSTS = [
  "www.elitebiotechpeptides.com",
  "elitebiotechpeptides.com",
];

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [currentUrl, setCurrentUrl] = useState(APP_URL);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  const hostname = useMemo(() => {
    try {
      return new URL(APP_URL).hostname;
    } catch {
      return "www.elitebiotechpeptides.com";
    }
  }, []);

  const handleNavigationStateChange = useCallback((navState: WebViewNavigation) => {
    setCurrentUrl(navState.url);
    setCanGoBack(navState.canGoBack);
  }, []);

  const handleShouldStart = useCallback((request: WebViewNavigation) => {
    const { url } = request;

    if (!url) {
      return false;
    }

    if (
      url.startsWith("mailto:") ||
      url.startsWith("tel:") ||
      url.startsWith("sms:")
    ) {
      void Linking.openURL(url);
      return false;
    }

    try {
      const nextUrl = new URL(url);
      if (INTERNAL_HOSTS.includes(nextUrl.hostname)) {
        return true;
      }
      void Linking.openURL(url);
      return false;
    } catch {
      return true;
    }
  }, []);

  const goHome = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    webViewRef.current?.injectJavaScript(`
      window.location.href = ${JSON.stringify(APP_URL)};
      true;
    `);
  }, []);

  const reload = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    webViewRef.current?.reload();
  }, []);

  const openInBrowser = useCallback(() => {
    void Linking.openURL(currentUrl || APP_URL);
  }, [currentUrl]);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.brand}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <View style={styles.brandCopy}>
            <Text style={styles.eyebrow}>ELITE BIOTECH</Text>
            <Text style={styles.title}>{COMPANY_NAME}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <HeaderButton label="Home" onPress={goHome} />
          <HeaderButton
            label="Back"
            onPress={() => webViewRef.current?.goBack()}
            disabled={!canGoBack}
          />
          <HeaderButton label="Reload" onPress={reload} />
        </View>
      </View>

      <View style={styles.noticeBar}>
        <Text style={styles.noticeText}>Shop the live storefront</Text>
        <Text style={styles.noticeText}>10% off $100+</Text>
        <Text style={styles.noticeText}>15% off $250+</Text>
      </View>

      <View style={styles.webviewFrame}>
        <WebView
          ref={webViewRef}
          source={{ uri: APP_URL }}
          originWhitelist={["*"]}
          onShouldStartLoadWithRequest={handleShouldStart}
          onNavigationStateChange={handleNavigationStateChange}
          onLoadStart={() => {
            setIsLoading(true);
            setHasError(false);
          }}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          pullToRefreshEnabled
          sharedCookiesEnabled
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState={false}
          allowsBackForwardNavigationGestures={Platform.OS === "ios"}
          setSupportMultipleWindows={false}
          style={styles.webview}
        />

        {isLoading ? (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#38bdf8" />
            <Text style={styles.overlayTitle}>Loading storefront</Text>
            <Text style={styles.overlayBody}>
              Syncing the live Elite Biotech experience into the app.
            </Text>
          </View>
        ) : null}

        {hasError ? (
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>Couldn&apos;t load the site</Text>
            <Text style={styles.overlayBody}>
              Check your connection or open the storefront in your browser.
            </Text>
            <View style={styles.overlayActions}>
              <HeaderButton label="Try again" onPress={reload} />
              <HeaderButton label="Open in browser" onPress={openInBrowser} />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function HeaderButton({
  label,
  onPress,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.actionButton,
        disabled ? styles.actionButtonDisabled : null,
        pressed && !disabled ? styles.actionButtonPressed : null,
      ]}
    >
      <Text style={[styles.actionText, disabled ? styles.actionTextDisabled : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#030712",
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "#04070d",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
    gap: 12,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  brandCopy: {
    flexShrink: 1,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  eyebrow: {
    color: "#7dd3fc",
    fontSize: 10,
    letterSpacing: 1.8,
    fontWeight: "700",
  },
  title: {
    color: "#f8fafc",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    gap: 6,
  },
  actionButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "#0b1220",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionButtonPressed: {
    backgroundColor: "#111827",
  },
  actionButtonDisabled: {
    opacity: 0.4,
  },
  actionText: {
    color: "#e2e8f0",
    fontSize: 12,
    fontWeight: "700",
  },
  actionTextDisabled: {
    color: "#94a3b8",
  },
  noticeBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 9,
    backgroundColor: "#0a1320",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  noticeText: {
    color: "#cbd5e1",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  webviewFrame: {
    flex: 1,
    position: "relative",
  },
  webview: {
    flex: 1,
    backgroundColor: "#030712",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    backgroundColor: "rgba(3,7,18,0.96)",
  },
  overlayTitle: {
    marginTop: 16,
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  overlayBody: {
    marginTop: 10,
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 340,
  },
  overlayActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18,
  },
});
