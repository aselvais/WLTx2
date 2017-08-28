
# WLTx2 - Win, Lose or Tie

This app is loosely base on [Native Starter Kit](https://github.com/start-react/native-starter-kit).
It is a Cross-platform mobile application using the Win, Lose or Tie API for
getting data about games, teams and leagues of amateur sports (so far Hockey only in the GTA area).


## 1. Installation

If the iOS and Android folder are missing after cloning this application,
please get them from the Native Starter Kit project (just download a ZIP and copy these
directories to the root of this project).

Install the libs:

```sh
$ npm install
```
Link the libs:

```sh
$ react-native link
```

Build the icons for Android and iOS:

```sh
$ app-icon generate
```

## 2. Run / develop

Just run the usual react native commands:

For iOS:
```sh
$ react-native run-ios
```

and for Android:
```sh
$ react-native run-android
```

## 3. Build release

For Android, do the following:
Of course you will need valid certificates, follow the guide at [Generating Signed APK](https://facebook.github.io/react-native/docs/signed-apk-android.html)
```sh
$ cd android
$ ./gradlew assembleRelease.sh
```

For iOS, you will need to open X-code and build an Archive then upload it to the App Store thing...



