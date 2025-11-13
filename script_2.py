
# Now let me create the CORRECT fixes

# 1. Fix index.html - ONLY change logo and home from "#" to "index.html"
#    Keep About, Pricing, Contact as they are (#about, #pricing, #contact)

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# First, let's make targeted replacements for the logo
# Find the exact logo pattern and replace
index_content = re.sub(
    r'(<a href=")#(" style="color: white; text-decoration: none; font-size: 28px; font-weight: bold; text-shadow: 1px 1px 2px rgba\(0,0,0,0\.2\); display: flex; align-items: center; gap: 10px;">\s*<span style="font-size: 32px;">🏢</span> Eternal GCC)',
    r'\1index.html\2',
    index_content,
    count=1
)

# Find and replace the Home link specifically (first nav list item with "Home")
# Look for the pattern in the navigation
index_content = re.sub(
    r'(<li><a href=")#(" style="color: white; text-decoration: none; font-weight: 500; transition: all 0\.3s; padding: 8px 14px; border-radius: 6px; font-size: 15px;"[^>]*>Home</a></li>)',
    r'\1index.html\2',
    index_content,
    count=1
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_content)

print("✓ Fixed index.html")
print("  - Logo: # → index.html")
print("  - Home: # → index.html")
print("  - About, Pricing, Contact: Kept as #about, #pricing, #contact (correct)")
