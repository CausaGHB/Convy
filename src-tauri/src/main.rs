// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![convert_image])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn convert_image(array_buffer: Vec<u8>, format: String, width: Option<u32>, height: Option<u32>, save_path: String) {
    use image::{ImageFormat, io::Reader};
    use std::path::Path;
    println!("{}", format);

    let mut img = match Reader::new(std::io::Cursor::new(array_buffer))
        .with_guessed_format()
        .unwrap()
        .decode()
    {
        Ok(img) => img,
        Err(e) => {
            println!("Error: Failed to decode image: {}", e);
            return;
        }
    };

    if let (Some(width), Some(height)) = (width, height) {
        img = img.resize(width, height, image::imageops::FilterType::Lanczos3);
    }

    let format = match format.as_str() {
        "png" => ImageFormat::Png,
        "bmp" => ImageFormat::Bmp,
        "jpeg" => ImageFormat::Jpeg,
        "webp" => ImageFormat::WebP,
        "tiff" => ImageFormat::Tiff,
        "ico" => ImageFormat::Ico,
        _ => {
            println!("Error: Unsupported format");
            return;
        }
    };

    let path = Path::new(&save_path);
    if let Err(e) = img.save_with_format(path, format) {
        println!("Error: Failed to save image: {}", e);
    }
}

