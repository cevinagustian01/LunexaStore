with open('src/app/admin/dashboard/netflix/page.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Add a query parameter to bypass cache
code = code.replace('src="/netflix-tool/"', 'src="/netflix-tool/?v=3"')

with open('src/app/admin/dashboard/netflix/page.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
print("Updated iframe src with cache buster")
