
# 2. Fix sub-sites - ONLY replace "index_updated_fixed.html" with "index.html"
#    This will fix About, Pricing, Contact links to point to correct main page

subsite_files = ['it-services.html', 'electrical-services.html', 'ac-services.html']

for filename in subsite_files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Count occurrences
    count = content.count('index_updated_fixed.html')
    
    # Replace all occurrences
    content = content.replace('index_updated_fixed.html', 'index.html')
    
    # Save back to same file
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Fixed {filename}")
    print(f"  - Replaced {count} occurrences: index_updated_fixed.html → index.html")
