# Evil Electron a Backdoored Electron app.asar
This is a fork of the Electron Quick Start application at
https://github.com/electron/electron-quick-start.

It spawns a command prompt. To change it, change [preload.js](preload.js).

## Usecase
If you have a bundled Electron app you can replace the original `app.asar` with
this app to get a command prompt.

## Quickstart

1. Make a copy of the original `/path/to/electron/app/resources/app.asar` file.
2. Copy `release/app.asar` into the path above.
3. Run the Electron app to see `cmd` pop.

## Building
This repository creates an `app.asar` file and not a complete Electron app. Note
we are not running `npm install` because the original Electron app already has
the dependency.

```
# Clone this repository
git clone https://github.com/parsiya/evil-electron
# Go into the repository
cd evil-electron
# Install asar globally if it's not already installed
npm install -g asar
# Package the app into app.asar (modify for non-Windows OS)
asar pack . release/app.asar --unpack-dir "{**/.git,**/release,**/node_modules}" && rd "release/app.asar.unpacked" /s /q
# Copy release/app.asar to the place you want.
```

## Testing
To test your `app.asar` you need to install Electron.

```
# Clone this repository
git clone https://github.com/parsiya/evil-electron
# Go into the repository
cd evil-electron
# Install dependencies
npm install
# Run the app to test it, you should see the command prompt
npm start
# Install asar globally if it's not already installed
npm install -g asar
# Package the app into app.asar (modify for non-Windows OS)
asar pack . release/app.asar --unpack-dir "{**/.git,**/release,**/node_modules}" && rd "release/app.asar.unpacked" /s /q
# Copy release/app.asar to `resources/app.asar` for your target application
```

## Troubleshooting
See the original repository at https://github.com/electron/electron-quick-start
and the [Writing Your First Electron App][first-electron] article.

[first-electron]: https://www.electronjs.org/docs/tutorial/first-app

## Questions

### My app.asar is Too Big

1. Did you exclude `node_modules` from the `asar pack` command?
2. Did you delete the old `app.asar` file? The asar command will append data to existing files.

### Only Works on Windows
Yes. Detecting the OS and popping the equivalent of cmd on other operating
systems is ~~left as an exercise to the reader~~ is tracked in
[issue #1](https://github.com/parsiya/evil-electron/issues/1). Please create a
pull request if you do so before I do it.

### I Cannot `asar extract` the Release File
Yes, `asar` for some reason likes to reference the excluded files and keeps them
in the `app.asar.unpacked` directory. We delete this directory with our
`asar pack` command but `asar extract` needs this directory to extract things
properly. If you know how to fix this please let me know.

### Should I Also Copy the `app.asar.unpacked` Directory?
No. These are excluded files that are not needed for the application.

### I Want Package and Make a Standalone Electron Application
See https://www.electronjs.org/docs/tutorial/application-distribution.

### Do I Need `nodeIntegration`?
No. We are doing our spawn in `preload.js`. This file has almost complete access
to the Node APIs.

## License
MIT, see [LICENSE](LICENSE) for details. The original project is licensed under
`CC0 1.0 (Public Domain)`. I felt like the hamburglar after changing the
license.
