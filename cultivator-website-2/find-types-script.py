from pathlib import Path

folder = Path(r'C:\Users\Admin\Desktop\Files\Development\kultivation-web-project-main\kultivator-web-project\cultivator-website-2/svg/')

svg_files = list(folder.rglob('*.svg'))
png_files = list(folder.rglob('*.png'))
jpg_files = list(folder.rglob('*.jpg'))
webp_files = list(folder.rglob('*.webp'))


files = svg_files + jpg_files + png_files + webp_files
[print(i) for i in files]
