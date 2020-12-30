[![Platform](https://img.shields.io/badge/platform-%20Android%20-brightgreen.svg)](https://github.com/sam38124)
[![characteristic](https://img.shields.io/badge/特點-%20輕量級%20%7C%20簡單易用%20%20%7C%20穩定%20-brightgreen.svg)](https://github.com/sam38124)
# GlitterFrameWork
 This is the h5 hybrid development framework, which allows you to achieve cross-platform development of android, ios, and web, which allows you to greatly shorten the development time and retain the scalability of native development~

## Create by

<p align="center"><img width = "500"  src="https://github.com/sam38124/JzFrameWork/blob/master/App%20icon/squarestudio.png?raw=tru"><a name="Use"></a></p>

## List
* [Configuration](#Import)
* [Quick Start](#Use)
* [About me](#About)

<a name="Import"></a>
##  Configuration

### WebServer with Ktor
> Support Gradle<br/>

   1.Add  into your build.gradle 
```kotlin
 implementation "com.jzLibrary:GlitterFrameWork-jvm:1.0"
```
   2.Set up in your routing
```kotlin
Glitter.setUp(this)
```
### Android


> Support jcenter。 <br/>

   1.Add  into your build.gradle 
```kotlin
allprojects {
		repositories {
			...
			maven { url 'https://jitpack.io' }
		}
	}
```

   2.Add into your dependencies

```kotlin
dependencies {
implementation 'com.github.sam38124: Glitter:3.2'
}
```

### IOS

> Support swiftPackage <br/>

<a name="Use"></a>
## Quick Start

### Try with HelloWorld 

1.Start Codind in Entry.js
```javascript
function onCreate() {
    //Set up with your first page
    glitter.setHome('HelloWorld.html', 'HelloWorld', '')
}

```

2.Open Application.html on browser!

<img src='https://github.com/sam38124/PhotoGalary/blob/master/%E6%88%AA%E5%9C%96%202020-12-30%20%E4%B8%8A%E5%8D%8811.49.28.png?raw=true' width = "400" >


<a name="About"></a>
# About me
#### <font color="#0000dd"> Work for: </font><br /> 
+ ##### <font color="#660000">【Orange Electronic】橙的電子-Deputy Head of R&D </font><br /> 
+ ##### <font color="#660000">【Square Studio】四方工作室-CEO </font><br />
#### <font color="#0000dd"> Main skill: </font><br /> 
+ ##### (Kotlin,Java,Swift,Javascript,Objective-C,C#,jQuery,Mysql,SqlServer)
+ ##### Android and IOS Hybrid or Native App<br/>  
+ ##### Jsp and Ktor<br/> 
+ ##### H5 WebApp<br /> 
#### <font color="#0000dd"> Contact information: </font><br /> 
+  ##### line:sam38124<br /> 

+  ##### gmail:sam38124@gmail.com
