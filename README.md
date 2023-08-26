# Convy

Convy is an image conversion application written in Rust using the image crate. This project was created for learning purposes.

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Supported Formats](#supported-formats)
- [Features](#features)
- [Localization](#localization)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Version History](#version-history)

## Introduction
![image](https://github.com/CausaGHB/Convy/assets/120611872/69aeb643-5eae-4fe9-a01c-0d61276d1e9d)

Convy is a Rust-based image conversion application that leverages the image crate. It allows users to convert images between various formats, such as PNG, JPEG, ICO, BMP, TIFF, and WebP. This project was initiated for educational purposes and aims to demonstrate the use of Rust in building image processing applications.

## Getting Started

To get started with Convy, follow these steps:

1. Install Rust and Cargo if you haven't already.
2. Clone the Convy repository: `git clone https://github.com/yourusername/convy.git`
3. Navigate to the project directory: `cd convy`
4. Build the application: `cargo build`
5. Run the application: `cargo run`
   
or

1. Download the msi or setup file and install, tauri requires webview2 wich might be already installed in your system.

## Usage

Convy provides a user-friendly interface for converting images:

1. Choose a source image file.
2. Select the desired output format (PNG, JPEG, etc.).
3. Specify the dimensions or aspect ratio if needed.
4. Click the "Convert" button to initiate the conversion.

For detailed usage instructions and examples, refer to the [Usage](usage.md) guide.

## Supported Formats

Convy supports the following image formats:

- PNG
- JPEG
- ICO
- BMP
- TIFF
- WebP

## Features

- Simple and intuitive user interface.
- Support for various image formats.
- Option to specify dimensions or aspect ratio during conversion.

## Localization

Convy supports multiple languages, including:

- English
- Spanish

You can change the language in the app settings.

## Troubleshooting

If you encounter any issues while using Convy, please refer to the [Troubleshooting](troubleshooting.md) guide for solutions.

## Contributing

Contributions are welcome! If you find a bug or have an idea for an improvement, please create an issue or submit a pull request.

For contribution guidelines, refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Convy is open-source software licensed under the [GNU 3.0 public license](LICENSE).

## Acknowledgments

I would like to thank the authors of the [image crate](https://crates.io/crates/image) for providing a powerful image processing library.
As well to say that this is not a program to sell, is just a learning experience in tauri, as a tool i did for myself and friends, wich you may use
for learning purposes, inspiration or personal use.

## Version History

For information about the latest updates and changes, please refer to the [Changelog](CHANGELOG.md).
