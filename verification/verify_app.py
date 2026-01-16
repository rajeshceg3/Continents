from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # --- Desktop ---
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()
        page.goto("http://localhost:8080/index.html")

        # 1. Welcome Screen
        page.wait_for_selector("#welcome-screen")
        # Wait a bit for animation
        time.sleep(2)
        page.screenshot(path="verification/01_welcome.png")
        print("Captured 01_welcome.png")

        # 2. Enter Map
        page.click("#begin-button")
        # Wait for fade out
        time.sleep(2)
        page.wait_for_selector(".continent-marker")
        time.sleep(2) # Map tiles load
        page.screenshot(path="verification/02_map_desktop.png")
        print("Captured 02_map_desktop.png")

        # 3. Tooltip
        marker = page.locator(".continent-marker").first
        marker.hover()
        time.sleep(0.5)
        page.screenshot(path="verification/03_tooltip.png")
        print("Captured 03_tooltip.png")

        # 4. Open Sidebar (Desktop)
        marker.click()
        page.wait_for_selector("#sidebar.active")
        time.sleep(2) # Wait for flyTo and sidebar transition
        page.screenshot(path="verification/04_sidebar_desktop.png")
        print("Captured 04_sidebar_desktop.png")

        # --- Mobile ---
        context_mobile = browser.new_context(viewport={'width': 375, 'height': 812}, is_mobile=True, has_touch=True)
        page_mobile = context_mobile.new_page()
        page_mobile.goto("http://localhost:8080/index.html")

        # Skip welcome
        page_mobile.click("#begin-button")
        time.sleep(2)

        # 5. Open Bottom Sheet (Mobile)
        marker_mobile = page_mobile.locator(".continent-marker").nth(2) # Pick another one
        marker_mobile.click()
        page_mobile.wait_for_selector("#bottom-sheet.active")
        time.sleep(2)
        page_mobile.screenshot(path="verification/05_sheet_mobile.png")
        print("Captured 05_sheet_mobile.png")

        browser.close()

if __name__ == "__main__":
    run()
