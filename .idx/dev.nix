# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
#
# Create a file ".env.nix" with the following syntax to work:
# {
#   GOOGLE_GENAI_API_KEY = "private_key";
#   FIREBASE_PROD_KEY = "private_key";
# }
# ATTENTION: Do not commit the file with the key.
{pkgs}: 
let
  env = import ./.env.nix;
in {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.yarn
    pkgs.nodePackages.pnpm
    pkgs.bun
    pkgs.jdk17
  ];
  
  # Sets environment variables in the workspace
  env = {
    GOOGLE_GENAI_API_KEY = env.GOOGLE_GENAI_API_KEY;
    ACCESS_CONTROL_ALLOW_CREDENTIALS = "true";
    ACCESS_CONTROL_ALLOW_ORIGIN = "*";
    ACCESS_CONTROL_ALLOW_METHODS = "GET,OPTIONS,PATCH,DELETE,POST,PUT";
    ACCESS_CONTROL_ALLOW_HEADERS = "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version";
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "biomejs.biome"
    ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        npm-install = "npm ci --no-audit --prefer-offline --no-progress --timing";
      };
      # To run something each time the workspace is (re)started, use the `onStart` hook
      onStart = {
        genkit-start = "cd functions && genkit start";
      };
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
