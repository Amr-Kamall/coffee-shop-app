package com.eventify

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen // Import the SplashScreen module

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "eventify"

    override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreen.show(this) // Add this line to show the splash screen
        super.onCreate(savedInstanceState)
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
    }
}