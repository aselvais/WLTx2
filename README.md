
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
Arnauds-MacBook-Pro:WLTx2 arnaud$ code-push app add WinLoseOrTie-android android react-native
Successfully added the "WinLoseOrTie" app, along with the following default deployments:
┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ TkzhMiuvHCt63fGBfBIL167I0MiDd6a1b3b3-a940-4ce5-ace9-1b792d004c3a │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ J9cJVEsl-4FUwMQtCpV0nlaEj30pd6a1b3b3-a940-4ce5-ace9-1b792d004c3a │
└────────────┴──────────────────────────────────────────────────────────────────┘

Arnauds-MacBook-Pro:WLTx2 arnaud$ code-push app add WinLoseOrTie-ios ios react-native
Successfully added the "WinLoseOrTie-ios" app, along with the following default deployments:

┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ RtlN7DJ4fSmB2HLU8QeS_t89VSaAd6a1b3b3-a940-4ce5-ace9-1b792d004c3a │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ so5ufonprUcPMHZT23KYGBqcyv1Wd6a1b3b3-a940-4ce5-ace9-1b792d004c3a │
└────────────┴──────────────────────────────────────────────────────────────────┘

code-push release-react WinLoseOrTie-android android -d Production
code-push release-react WinLoseOrTie-ios ios -d Production


code-push deployment ls WinLoseOrTie-android
code-push deployment ls WinLoseOrTie-ios

```


# Branding

 Things to consider for the branded app:
 - Rename the elements in the ios and android folders
 - Change the google analytics ID
 - Change the logos and icons
 - Add fixed data for the league/division/ ...
 - Change the CodePush ID
 

