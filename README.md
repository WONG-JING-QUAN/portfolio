# Wong Jing Quan — Data Analytics Portfolio

Static site (HTML, CSS, vanilla JS). No build step is needed to view it: open `index.html` in a browser,
or serve the folder with any static host (GitHub Pages works as is).

## Pages

| File | What it holds |
| --- | --- |
| `index.html` | Profile snapshot, about, skills, certifications, experience, internship summary, selected work, contact |
| `internship.html` | Internship e-portfolio: overview, practicum project, 13 weekly reports, key terms, AI usage declaration, references |
| `style.css` | Shared styles. Rules for the internship pages are appended at the end under "v7 ADDITIONS" |
| `script.js` | Shared behaviour (preloader, navigation, theme, reveal, tilt, counters, project filters) |
| `internship.js` | Internship-page extras: week rail highlighting, number counters and the image viewer |

## Assets

- `assets/resume.pdf` — current résumé (downloaded by the hero button)
- `assets/internship/` — internship images (WebP, metadata stripped)

## Step 1: Run it on your computer first

Check the site locally before anything goes online.

### Option A: open the file (quickest)

1. Open File Explorer and go to `E:\Users\SHQTL\Desktop\WONG JING QUAN - Intern\eportfolio`.
2. Double-click `index.html`. It opens in your default browser.

Everything on the page works this way, but some browsers block a few features on files opened straight from disk.
Use Option B for the final check.

### Option B: a local web server (closest to the live site)

1. In File Explorer, open the `eportfolio` folder.
2. Click the address bar, type `cmd` and press Enter. A Command Prompt opens in that folder.
3. Run:

   ```
   python -m http.server 8000
   ```

   If Windows says Python is not found, install it from https://www.python.org/downloads/ (tick
   "Add python.exe to PATH" during setup), close the Command Prompt and repeat from step 2.
4. Open http://localhost:8000 in your browser.
5. When you finish, go back to the Command Prompt and press `Ctrl + C` to stop the server.

### What to check before going live

Go through this list on a computer, then again on your phone (open the site in your browser's device mode:
press `F12`, then `Ctrl + Shift + M`).

- [ ] The home page loads with your photo, name, degree and tagline.
- [ ] Every menu item scrolls to the right section, and "Internship" opens the Internship section.
- [ ] **Download Resume** downloads the current résumé.
- [ ] Each certificate card opens its PDF, and **View FYP Poster** opens the poster.
- [ ] Each "Case study" panel in Signature Work opens and closes.
- [ ] `internship.html` loads, the week list on the left follows you as you scroll, and clicking a week jumps to it.
- [ ] Clicking any image opens it full size; `Esc` closes it.
- [ ] The sun/moon button switches between dark and light mode.
- [ ] LinkedIn, GitHub, email and WhatsApp links open the right places.
- [ ] Press `F12` and open the **Console** tab: there should be no red errors.

If something looks wrong, take a screenshot (and copy any red Console message) and fix it before going live.

## Step 2: Put it live on GitHub Pages

The previous version of this site lives in the GitHub repository `WONG-JING-QUAN/portfolio`, which normally
publishes to **https://wong-jing-quan.github.io/portfolio/**. These steps replace that version with this one.

> Before publishing: get your industrial supervisor's permission for the internship content and photos, as
> the practicum briefing requires, and check that the people in the office photo are happy to appear online.
> The e-portfolio must stay online for two years.

### Option A: GitHub website only (no software needed)

1. Sign in at https://github.com and open https://github.com/WONG-JING-QUAN/portfolio.
2. Click **Add file → Upload files**.
3. In File Explorer, open the `eportfolio` folder, select **everything inside it** (`index.html`,
   `internship.html`, `style.css`, `script.js`, `internship.js`, `README.md` and the `assets` folder) and drag it
   onto the GitHub page. Files with the same name are replaced.
4. Wait for every file to finish uploading. Under **Commit changes**, type a message such as
   `Add internship e-portfolio`, then click **Commit changes**.

GitHub's web upload takes files up to 25 MB each, so every file here fits (the largest, `fyp-poster.pdf`, is about 14.6 MB).

### Option B: Git on your computer

Your old copy of the repository is in `E:\Users\SHQTL\Desktop\WONG JING QUAN - Intern\old_eportfolio\portfolio`.

1. Copy everything inside `eportfolio` into `old_eportfolio\portfolio`, and choose **Replace the files in the
   destination** when Windows asks. Do not delete the hidden `.git` folder there.
2. Open a Command Prompt in `old_eportfolio\portfolio` (address bar → `cmd` → Enter) and run:

   ```
   git pull
   git add -A
   git status
   ```

   `git status` lists what will be uploaded. Check it looks right.
3. Then run:

   ```
   git commit -m "Add internship e-portfolio"
   git push
   ```

   If Git asks you to sign in, sign in with your GitHub account in the window that appears.

### Turn on (or confirm) GitHub Pages

1. In the repository on GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**, **Branch** to `main` and the folder to
   `/ (root)`, then click **Save**.
3. After a minute or two, the page shows "Your site is live at …". That address is the link you submit.
   Progress is shown under the repository's **Actions** tab.

### Check the live site

1. Open the live address in a private/incognito window so you see the new version, not a cached one.
2. Repeat the checklist from Step 1, on your computer and on your phone.
3. If you still see the old version, wait a few minutes and press `Ctrl + F5` to reload without the cache.

## Updating later

Make your change in the `eportfolio` folder, check it locally (Step 1), then upload the changed files the same
way (Step 2). The live site updates a minute or two after each upload.

## Adding internship photos

Each weekly report has an image slot (`<div class="wk-gallery" data-slot="week-01">`), and the overview has
one for workplace photos (`data-slot="workplace"`). An empty slot renders nothing. To add a photo, place a
figure inside the slot:

```html
<figure class="i-figure glass-card">
  <a class="zoom" href="assets/internship/week-05-example.webp" aria-label="Enlarge image">
    <img src="assets/internship/week-05-example.webp" alt="What the photo shows" width="1280" height="960" loading="lazy" />
  </a>
  <figcaption><b>Week 5.</b> One-line caption.</figcaption>
</figure>
```

Add `shot` to the figure's class for a screenshot (full width, uncropped) or `landscape` for a 4:3 photo; portrait 3:4 is the default. Remove or mask
client data, file paths and colleagues' faces unless they have agreed, and get the industrial
supervisor's permission before publishing.

_Last updated 9 November 2026._
