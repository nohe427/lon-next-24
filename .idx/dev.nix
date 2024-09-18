# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }:
    let firebase-ext = pkgs.fetchurl {
    url =
      "https://firebasestorage.googleapis.com/v0/b/firemat-preview-drop/o/vsix%2Ffirebase-vscode-0.2.8.vsix?alt=media&token=ba272e6e-c6b3-4860-bc2a-cd5b9cd7e022";
    hash = "sha256-n4D70K61vThL3Tdjq1lq2Z/+4CBLtRj7ePY8uiv0taw=";
    name = "firebase.vsix";
  };
  in {
    # Which nixpkgs channel to use.
    channel = "stable-23.11"; # or "unstable"

    # Use https://search.nixos.org/packages to find packages
    packages = [
      pkgs.jdk17
      pkgs.unzip
      (pkgs.postgresql_15.withPackages (p: [ p.pgvector ]))
      pkgs.nodejs_20
      pkgs.yarn
      pkgs.nodePackages.pnpm
      pkgs.bun
      pkgs.zip
      pkgs.curl
    ];

    # Sets environment variables in the workspace
    env = {
      POSTGRESQL_CONN_STRING = "postgresql://user:mypassword@localhost:5432/dataconnect?sslmode=disable";
      FIRESQL_PORT = "9939";
    };
    processes = {
      postgresRun = {
        command = "postgres -D ./local -k /tmp";
      };
    };
    idx = {
      # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
      extensions = [
        # "vscodevim.vim"
        "Dart-Code.flutter"
        "mtxr.sqltools-driver-pg"
        "mtxr.sqltools"
        "GraphQL.vscode-graphql-syntax"
        "${firebase-ext}"
      ];

      # Enable previews
      previews = {
        enable = true;
        previews = {
          # web = {
          #   # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
          #   # and show it in IDX's web preview panel
          #   command = ["npm" "run" "dev"];
          #   manager = "web";
          #   env = {
          #     # Environment variables to set for your server
          #     PORT = "$PORT";
          #   };
          # };
        };
      };

      # Workspace lifecycle hooks
      workspace = {
        # Runs when a workspace is first created
        onCreate = {
          # Example: install JS dependencies from NPM
          # npm-install = "npm install";
        };
        # Runs when the workspace is (re)started
        onStart = {
          # Example: start a background task to watch and re-build backend code
          # watch-backend = "npm run watch-backend";
        };
      };
    };
  }
