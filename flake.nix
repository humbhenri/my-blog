
{
  description = "Ambiente de desenvolvimento Node.js";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
      };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [
          python3
          nodejs_24
          pkgs.typescript
          pkgs.typescript-language-server
 	        tree-sitter
        ];

        shellHook = ''
          echo "Ambiente Node.js carregado"
          node --version
          npm --version
        '';
      };
    };
}

