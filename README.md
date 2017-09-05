
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


# Code push

Here is what I got:

```bash
Arnauds-MacBook-Pro:WLTx2 arnaud$ code-push app add TorontoMarlboros android react-native
Successfully added the "TorontoMarlboros" app, along with the following default deployments:
┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ SNC_O3BFznfiFxHPlDr0tGtj6cxDd6a1b3b3-a940-4ce5-ace9-1b792d004c3a │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ qHKfaScw48X8F1Vkap3hIsiMvpsLd6a1b3b3-a940-4ce5-ace9-1b792d004c3a │
└────────────┴──────────────────────────────────────────────────────────────────┘

Arnauds-MacBook-Pro:WLTx2 arnaud$ code-push app add TorontoMarlboros-ios ios react-native
Successfully added the "TorontoMarlboros-ios" app, along with the following default deployments:
┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ P1bwDe_ZkZsJv2strZV6-hB2u0uAd6a1b3b3-a940-4ce5-ace9-1b792d004c3a │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ UuPygacAW9GC_D5Rc22e0l6Qnlckd6a1b3b3-a940-4ce5-ace9-1b792d004c3a │
└────────────┴──────────────────────────────────────────────────────────────────┘


code-push release-react TorontoMarlboros android --description "Button cleaned up" -d Production
code-push release-react TorontoMarlboros-ios ios --description "Button cleaned up" -d Production 


code-push deployment ls TorontoMarlboros 

```



