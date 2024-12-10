# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }:
  {
    # Which nixpkgs channel to use.
    channel = "stable-23.11"; # or "unstable"

    # Use https://search.nixos.org/packages to find packages
    packages = [
      pkgs.nodePackages.firebase-tools
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
      FIREBASE_DATACONNECT_POSTGRESQL_STRING = "postgresql://user:mypassword@localhost:5432/dataconnect?sslmode=disable";
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
        "mtxr.sqltools-driver-pg"
        "mtxr.sqltools"
        "GraphQL.vscode-graphql-syntax"
        "GoogleCloudTools.firebase-dataconnect-vscode"
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
          downloadDb = ''
            curl -o local.zip 'https://firebasestorage.googleapis.com/v0/b/yt-rag.appspot.com/o/genkit%2FlonNext%2Flocal.zip?alt=media&token=49f61fea-df00-4796-96b6-696ff72fa426'
            unzip local.zip -d .
            chmod 0750 local
          '';
          install-genkit-folder = ''
          cd genkit
          npm i
          '';
          install-genkit-final-folder = ''
            cd genkit_final
            npm i
          '';
          global-install-genkit = ''
            npm i -g genkit
          '';
        };
        # Runs when the workspace is (re)started
        onStart = {
          # Example: start a background task to watch and re-build backend code
          # watch-backend = "npm run watch-backend";
        };
      };
  };
  }
