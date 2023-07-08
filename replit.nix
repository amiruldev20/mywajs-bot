{ pkgs }: {
	deps = [
		pkgs.nodejs-18_x
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.ffmpeg
    pkgs.libwebp
    pkgs.libuuid
    pkgs.imagemagick
    pkgs.wget
    pkgs.replitPackages.jest
    pkgs.speedtest
    pkgs.chromium
    pkgs chromedriver
	];
}