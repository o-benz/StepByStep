{
  description = "A template for Angular";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, ... }@inputs: inputs.utils.lib.eachSystem [
    "x86_64-linux"
  ]
    (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      in
      {
        devShells.default = pkgs.mkShell rec {
          name = "node-project";
          #DATABASE_CONNECTION_STRING = mongodb+srv://team202projet2goat:df4wIoi98oaGvUsM@cluster0.r73i7wa.mongodb.net/?retryWrites=true&w=majority;
          PORT = 3000;

          packages = with pkgs; [
            nodejs
            nodePackages.npm
            nodePackages.typescript
            nodePackages.typescript-language-server
            mongosh
            mongoc
          ];
        };
      });
}
