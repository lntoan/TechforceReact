package com.techforcereact;

import android.app.Application;
import com.facebook.react.ReactApplication;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import io.realm.react.RealmReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {


    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNDeviceInfo(),
            new FBSDKPackage(mCallbackManager),
            new RealmReactPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new LinearGradientPackage(),
            new GoogleAnalyticsBridgePackage(),
            new RNGoogleSigninPackage() // <-- add this
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
