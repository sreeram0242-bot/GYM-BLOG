import os
from PIL import Image, ImageDraw, ImageFont
import shutil

# 1. Copy user logo to assets
os.makedirs('assets', exist_ok=True)
if os.path.exists('20260920_135024.png'):
    shutil.copy('20260920_135024.png', 'assets/gymflow_logo.png')
    logo_im = Image.open('20260920_135024.png')
    logo_im.save('assets/favicon.png', 'PNG')
    logo_im.resize((64, 64)).save('favicon.ico', format='ICO')
    print('Logo & Favicon created!')

def process_pc(gym_name="PowerHouse Fitness", owner_name="Sreeram", members="248", checkins="64", in_gym="14", collection="₹24,500"):
    im = Image.open('Screenshot 2026-09-20 125333.png').convert('RGBA')
    draw = ImageDraw.Draw(im)
    
    font_welcome = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 31)
    font_card_num = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 34)
    font_card_sub = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 13)
    font_badge = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 13)
    font_sidebar_gym = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 15)
    font_sidebar_owner = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 13)
    font_sidebar_sub = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 13)
    font_activity = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 18)
    
    # 1. Badge "⚡ PowerHouse Fitness"
    pill_bg = im.getpixel((450, 35))
    draw.rectangle([400, 24, 550, 48], fill=pill_bg)
    draw.text((404, 27), gym_name, fill=(51, 65, 85, 255), font=font_badge)
    
    # 2. Welcome Headline: "Welcome Back, Sreeram!"
    welcome_bg = (255, 255, 255, 255)
    draw.rectangle([370, 60, 920, 108], fill=welcome_bg)
    draw.text((375, 63), f'Welcome Back, {owner_name}!', fill=(11, 30, 54, 255), font=font_welcome)
    
    # 3. Sidebar Gym Name:
    sidebar_drop_bg = (255, 255, 255, 255)
    draw.rectangle([18, 98, 275, 126], fill=sidebar_drop_bg)
    draw.text((22, 101), gym_name, fill=(11, 30, 54, 255), font=font_sidebar_gym)
    
    # 4. Sidebar Owner:
    sidebar_owner_bg = (250, 251, 253, 255)
    draw.rectangle([8, 148, 305, 172], fill=sidebar_owner_bg)
    draw.text((12, 151), f'Owner: {owner_name}', fill=(100, 116, 139, 255), font=font_sidebar_owner)
    subdomain = gym_name.lower().replace(' ', '')[:12]
    draw.text((200, 151), subdomain, fill=(30, 58, 138, 255), font=font_sidebar_sub)
    
    # 5. Total Members:
    card_bg = (255, 255, 255, 255)
    draw.rectangle([378, 246, 480, 288], fill=card_bg)
    draw.text((380, 248), members, fill=(11, 30, 54, 255), font=font_card_num)
    
    # 6. Today Check-Ins:
    draw.rectangle([762, 246, 920, 288], fill=card_bg)
    draw.text((764, 248), checkins, fill=(11, 30, 54, 255), font=font_card_num)
    draw.rounded_rectangle([826, 256, 912, 282], radius=6, fill=(220, 252, 231, 255))
    draw.text((834, 260), f'{in_gym} In Gym', fill=(21, 128, 61, 255), font=font_card_sub)
    
    # 7. Today's Collection:
    draw.rectangle([1532, 246, 1720, 288], fill=card_bg)
    draw.text((1534, 248), collection, fill=(11, 30, 54, 255), font=font_card_num)
    
    # 8. Activity Title:
    draw.rectangle([405, 534, 690, 564], fill=card_bg)
    draw.text((408, 538), f"Today's Check-In Activity ({checkins})", fill=(11, 30, 54, 255), font=font_activity)
    
    im.save('assets/gymflow_pc_ui_real.png', 'PNG')
    print('Clean PC UI generated!')

def process_mob(gym_name="PowerHouse Fitness", owner_name="Sreeram", members="248", checkins="64", in_gym="14", collection="₹24,500"):
    im = Image.open('Screenshot 2026-09-20 125351.png').convert('RGBA')
    draw = ImageDraw.Draw(im)
    
    font_top_gym = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 15)
    font_top_owner = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 13)
    font_badge = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 12)
    font_welcome = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 23)
    font_card_num = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 34)
    font_card_sub = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 12)
    
    # 1. Top bar:
    draw.rectangle([58, 8, 250, 27], fill=(255, 255, 255, 255))
    draw.text((60, 10), gym_name, fill=(11, 30, 54, 255), font=font_top_gym)
    draw.rectangle([58, 28, 250, 50], fill=(255, 255, 255, 255))
    draw.text((60, 31), owner_name, fill=(30, 58, 138, 255), font=font_top_owner)
    
    # 2. Badge:
    badge_bg = (241, 245, 249, 255)
    draw.rectangle([68, 76, 235, 105], fill=badge_bg)
    draw.text((72, 81), gym_name, fill=(51, 65, 85, 255), font=font_badge)
    
    # 3. Welcome:
    draw.rectangle([30, 116, 435, 158], fill=(255, 255, 255, 255))
    draw.text((34, 120), f'Welcome Back, {owner_name}!', fill=(11, 30, 54, 255), font=font_welcome)
    
    # 4. Total Members:
    draw.rectangle([34, 355, 140, 395], fill=(255, 255, 255, 255))
    draw.text((35, 357), members, fill=(11, 30, 54, 255), font=font_card_num)
    
    # 5. Today Check-Ins:
    draw.rectangle([252, 355, 415, 395], fill=(255, 255, 255, 255))
    draw.text((254, 357), checkins, fill=(11, 30, 54, 255), font=font_card_num)
    draw.rounded_rectangle([310, 365, 392, 390], radius=5, fill=(220, 252, 231, 255))
    draw.text((317, 368), f'{in_gym} In Gym', fill=(21, 128, 61, 255), font=font_card_sub)
    
    # 6. Today's Collection:
    draw.rectangle([250, 536, 420, 595], fill=(255, 255, 255, 255))
    draw.text((254, 545), collection, fill=(11, 30, 54, 255), font=font_card_num)
    
    im.save('assets/gymflow_mobile_ui_real.png', 'PNG')
    print('Clean Mobile UI generated!')

if __name__ == '__main__':
    process_pc()
    process_mob()
