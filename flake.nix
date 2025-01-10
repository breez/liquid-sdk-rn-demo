{
  description = "Liquid SDK React Native Demo Flake";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    # nixpkgs.url = "github:NixOS/nixpkgs/24.05";
    flake-utils.url = "github:numtide/flake-utils";
    android-nixpkgs.url = "github:tadfisher/android-nixpkgs";
  };

  outputs = { self, nixpkgs, flake-utils, android-nixpkgs }: flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs {
        inherit system;
        config = {
          android_sdk.accept_license = true;
          allowUnfree = true;
        };
      };

      pinnedJDK = pkgs.jdk17;
      buildToolsVersion = "35.0.0";
      ndkVersion = "26.1.10909125";
      androidComposition = pkgs.androidenv.composeAndroidPackages {
        cmdLineToolsVersion = "8.0";
        toolsVersion = "26.1.1";
        platformToolsVersion = "34.0.4";
        buildToolsVersions = [ buildToolsVersion "34.0.0" ];
        includeEmulator = true;
        emulatorVersion = "35.1.4";
        platformVersions = [ "35" "34" ];
        includeSources = false;
        includeSystemImages = true;
        systemImageTypes = [ "google_apis_playstore" ];
        abiVersions = [ "x86_64" ];
        cmakeVersions = [ "3.10.2" "3.22.1" ];
        includeNDK = true;
        ndkVersions = [ ndkVersion ];
        useGoogleAPIs = false;
        useGoogleTVAddOns = false;
        includeExtras = [
          "extras;google;gcm"
        ];
      };
      sdk = androidComposition.androidsdk;
    in
    {
      devShell = pkgs.mkShell rec {
        buildInputs = with pkgs; [
          # Android
          pinnedJDK
          sdk
          pkg-config

          # TS/JS
          pnpm
          nodejs_20
          typescript

          # LSP
          ast-grep
          eslint_d
          typescript-language-server
        ];

        JAVA_HOME = pinnedJDK;
        ANDROID_SDK_ROOT = "${androidComposition.androidsdk}/libexec/android-sdk";
        ANDROID_NDK_ROOT = "${ANDROID_SDK_ROOT}/ndk/${ndkVersion}";

        GRADLE_OPTS = "-Dorg.gradle.project.android.aapt2FromMavenOverride=${ANDROID_SDK_ROOT}/build-tools/${buildToolsVersion}/aapt2";
      };
    });
}
