<!--
 @since 2024.12.01, 07:56
 @changed 2024.12.01, 07:56
-->

## Installation and setup of working withj iisnode IIS extension

- [How to Install IIS on Windows 10](https://jotelulu.com/en-gb/support/tutorials/how-to-install-iis-on-windows-10/)
- [tjanczuk/iisnode: Hosting node.js applications in IIS on Windows](https://github.com/tjanczuk/iisnode)
- [Microsoft Supported Downloads : The Official Microsoft IIS Site](https://iis-umbraco.azurewebsites.net/downloads/microsoft)

Ensure that 'Feature delegation' setting is enabled in the IIS management console.

- [iis - Config Error: This configuration section cannot be used at this path - Stack Overflow](https://stackoverflow.com/questions/9794985/config-error-this-configuration-section-cannot-be-used-at-this-path)

> You can use the **IIS Manager** to edit these settings. Read more at [_An Overview of Feature Delegation_](https://learn.microsoft.com/en-us/iis/manage/managing-your-configuration-settings/an-overview-of-feature-delegation-in-iis):

See iisnode examples:

```
C:\Program Files\iisnode\www
```

See logs at:

```
%SystemDrive%\inetpub\logs\LogFiles
%SystemDrive%\Windows\System32\LogFiles\HTTPERR
http://localhost/iisnode
```

Ensure full access permissions for `IIS_IUSRS` user.
