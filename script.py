
# Let me check the original files more carefully to understand the correct navigation pattern
import re

print("ANALYZING ORIGINAL FILES - NAVIGATION STRUCTURE")
print("=" * 80)

# Check index.html in detail
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

print("\n1. INDEX.HTML (Main Page) - Current Navigation:")
print("-" * 80)

# Find all navigation links in index.html
nav_section = re.search(r'<nav[^>]*>(.*?)</nav>', index_content, re.DOTALL | re.IGNORECASE)
if nav_section:
    nav_html = nav_section.group(1)
    
    # Extract logo link
    logo = re.search(r'<a href="([^"]*)"[^>]*>\s*<span[^>]*>🏢</span>\s*Eternal GCC', nav_html)
    if logo:
        print(f"  Logo/Brand → href=\"{logo.group(1)}\"")
    
    # Extract all main nav links
    nav_links = re.findall(r'<li><a href="([^"]*)"[^>]*>([^<]+)</a></li>', nav_html)
    print("\n  Main Navigation Links:")
    for href, text in nav_links[:10]:  # First 10 to avoid dropdown items
        print(f"    {text.strip()} → href=\"{href}\"")

# Check one of the sub-sites
print("\n\n2. IT-SERVICES.HTML (Sub-site) - Current Navigation:")
print("-" * 80)

with open('it-services.html', 'r', encoding='utf-8') as f:
    subsite_content = f.read()

nav_section = re.search(r'<nav[^>]*>(.*?)</nav>', subsite_content, re.DOTALL | re.IGNORECASE)
if nav_section:
    nav_html = nav_section.group(1)
    
    # Extract logo link
    logo = re.search(r'<a href="([^"]*)"[^>]*>\s*<span[^>]*>🏢</span>\s*Eternal GCC', nav_html)
    if logo:
        print(f"  Logo/Brand → href=\"{logo.group(1)}\"")
    
    # Extract all main nav links
    nav_links = re.findall(r'<li><a href="([^"]*)"[^>]*>([^<]+)</a></li>', nav_html)
    print("\n  Main Navigation Links:")
    for href, text in nav_links[:10]:
        print(f"    {text.strip()} → href=\"{href}\"")
