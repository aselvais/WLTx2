package com.WinLoseOrTie;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.yamill.orientation.OrientationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.microsoft.codepush.react.CodePush;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new CodePush("TkzhMiuvHCt63fGBfBIL167I0MiDd6a1b3b3-a940-4ce5-ace9-1b792d004c3a", MainApplication.this, BuildConfig.DEBUG),
            new RNDeviceInfo(),
            new GoogleAnalyticsBridgePackage(),
            new MainReactPackage(),
            new OrientationPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
