# .temp

1. パッケージの更新
```
sudo apt update && sudo apt upgrade -y
```

2. Node.jsのインストール (nvmを使うのがおすすめです)

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# ターミナルを再起動してから
nvm install --lts
```

3. Java (JDK) のインストール
```
sudo apt install openjdk-21-jdk -y
```

4. Android Studioのインストール（最重要）

WSL内でブラウザを開くのは少し手間なので、WindowsのブラウザでAndroid Studioの公式サイトからLinux用の .tar.gz ファイルをダウンロードします。

ダウンロードしたファイルを、WSLからアクセスできる場所に置きます（例: C:\Users\あなたの名前\Downloads）。

WSLのターミナルで、そのファイルを展開し、セットアップスクリプトを実行します。
```
# Windowsのダウンロードフォルダに移動
cd /mnt/c/Users/あなたの名前/Downloads

# Android Studioを展開
tar -xzf android-studio-*-linux.tar.gz

# 展開したフォルダを/optなどに移動
sudo mv android-studio /opt/

# セットアップウィザードを起動
/opt/android-studio/bin/studio.sh
```

これを実行すると、Windows上にAndroid StudioのGUI画面が表示されます（WSLgの機能）。ウィザードに従って、Android SDKやビルドツールなどをインストールしてください。