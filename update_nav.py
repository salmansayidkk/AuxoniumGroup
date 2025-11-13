#!/usr/bin/env python3
"""
Script to update navigation across all service pages
"""

# Read the AC services file to get the proper navigation
with open('ac-services.html', 'r', encoding='utf-8') as f:
    ac_content = f.read()

# Extract navigation section (from <nav to </div> after mobile menu)
nav_start = ac_content.find('  <!-- Header -->')
nav_end = ac_content.find('  <!-- Hero Section -->')
nav_section = ac_content[nav_start:nav_end].strip()

# Extract mobile CSS
css_start = ac_content.find('    /* Mobile Navigation */')
css_end = ac_content.find('  </style>')
mobile_css = ac_content[css_start:css_end]

# Extract mobile JS
js_start = ac_content.find('    // Mobile menu toggle')
js_end = ac_content.find('  </script>\n</body>')
mobile_js = ac_content[js_start:js_end]

# Update IT services
print("Updating it-services.html...")
with open('it-services.html', 'r', encoding='utf-8') as f:
    it_content = f.read()

# Replace navigation
it_nav_start = it_content.find('  <!-- Header -->')
it_nav_end = it_content.find('  <!-- Hero Section -->')
it_before = it_content[:it_nav_start]
it_after = it_content[it_nav_end:]
it_new_content = it_before + nav_section + '\n\n' + it_after

# Add mobile CSS if not present
if '/* Mobile Navigation */' not in it_new_content:
    it_new_content = it_new_content.replace('  </style>', mobile_css + '  </style>')

# Add mobile JS if not present
if '// Mobile menu toggle' not in it_new_content:
    it_new_content = it_new_content.replace("document.getElementById('year').textContent = new Date().getFullYear();",
                                            "document.getElementById('year').textContent = new Date().getFullYear();\n\n" + mobile_js)

with open('it-services.html', 'w', encoding='utf-8') as f:
    f.write(it_new_content)
print("✓ IT services updated")

# Update Electrical services
print("Updating electrical-services.html...")
with open('electrical-services.html', 'r', encoding='utf-8') as f:
    el_content = f.read()

# Replace navigation
el_nav_start = el_content.find('  <!-- Header -->')
el_nav_end = el_content.find('  <!-- Hero Section -->')
el_before = el_content[:el_nav_start]
el_after = el_content[el_nav_end:]
el_new_content = el_before + nav_section + '\n\n' + el_after

# Add mobile CSS if not present
if '/* Mobile Navigation */' not in el_new_content:
    el_new_content = el_new_content.replace('  </style>', mobile_css + '  </style>')

# Add mobile JS if not present
if '// Mobile menu toggle' not in el_new_content:
    el_new_content = el_new_content.replace("document.getElementById('year').textContent = new Date().getFullYear();",
                                            "document.getElementById('year').textContent = new Date().getFullYear();\n\n" + mobile_js)

with open('electrical-services.html', 'w', encoding='utf-8') as f:
    f.write(el_new_content)
print("✓ Electrical services updated")

print("\n✅ All service pages updated with professional navigation!")
