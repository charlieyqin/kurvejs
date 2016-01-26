# KurveJS

Kurve<nolink>.JS is an unofficial, open source JavaScript / TypeScript library that aims to simplify two tasks:

1. Easy authentication and authorization against Azure Active Directory - without navigating away from you web app for login or token requests.

2. Easy access to the Microsoft Graph REST API.

## How does it work?

The first thing you have to decide before using Kurve is which app model version you will use:

### App Model V1:

App model V1 is the current, production supported model in Azure AD. This model implies that:

1. You will register an application in Azure Active Directory, using the Azure Management Console (<a href="https://manage.windowsazure.com">https://manage.windowsazure.com</a>)
2. During that registration, you will pre-set the permissions your application will need. This means that you won't make those decisions about what types of permissions an app needs in runtime, but instead predefine those when you register your application in Azure AD
3. Every access token will be requested againast a resource, not a scope. For example, a resource could be Microsoft Exchange Online and another would be your custom web service

To find out more about using Kurve JS with app model V1, please read <b><a href="./docs/appModelV1/intro.md">this introduction document</a></b>.

### App Model V2:

App model V2 is a new, more modern way which is still in Preview and has several limitations at this point. It enables more flexible scenarios but you should probably avoid it in production code at this stage. This model implies that:

1. You will register an application in the new application registration portal under <a href="https://apps.dev.microsoft.com/">https://apps.dev.microsoft.com/</a>, which does not require using Azure Management Portal.
2. You do not specify application permissions during the registration. The application code itself will request for specific permissions in runtime (either during login or any time during the application execution). Kuve JS will help with that process.

To find out more about using Kurve JS with app model V2, please read <b><a href="./docs/appModelV2/intro.md">this introduction document</a></b>.


## FAQ

### Is this a supported library from Microsoft?

No it is not. This is an open source project built unofficially. If you are looking for a supported APIs we encourage you to directly call Microsoft's Graph REST APIs.

### Can I use/change this library?

You are free to take the code, change and use it any way you want it. But please be advised this code isn't supported.

### What if I find issues or want to contribute/help?

You are free to send us your feedback at this Github repo, send pull requests, etc. But please don't expect this to work as an official support channel

### Which files do I need to run this?

At minimum you need the KurveGraph.<nolink>js and Promises.<nolink>js, and optionally KurveIdentity.<nolink>js + login.html. You may use the TypeScript libraries and reuse some of the sample app code (index.html and app.<nolink>js) for reference.

# Release Notes

## 0.3.7:
 * Added support for calendar events

## 0.3.6:
 * Bug fixes
 * Introduction of the app model V2 support, including dynamic scopes and integration with the graph calls
 * Introduction of no window support, for older browsers that don't support popup windows during login

## 0.3.5:
 * New typed promises syntax supporting return and exception types
 
## 0.3.1:
 * Hotfix for the token expiration loop issue

## 0.3.0:
 * Better type support for all returned types in callbacks
 * Standardized return entities and collections into .data for all related properties returned from the graph so we differentiate the model data from action methods more easily

## 0.2.0:
 * Minification and unification of the library into a single file
 * No need for tenant ID anymore
 * Improved error handling, all error returns are now coming into the Kurve.Error class format
 * Additional graph methods, like reading groups, user profile's photos, user manager and direct reports
