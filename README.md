# R4 interactive website — HTML delivery

Revision: 30 October 2026.

## Open the complete website

Extract the ZIP archive and open `index.html`. Keep the HTML files and the entire `assets/` directory together. The 11 public pages embed their styling and interaction code; generated images and the editable news dataset are bundled assets. No framework, external font, package installation or build step is required for viewing.

Do not open individual HTML files outside the extracted directory if you require their images and news data. Use the complete ZIP package for offline navigation and deployment.

## Pages

| File | Purpose |
| --- | --- |
| index.html | Image-led homepage, modality explorer and current news |
| technology.html | Satellite cluster, 15-dimension comparison, interactive figure and displacement model |
| applications.html | Applications overview and enlarged-image gallery |
| defence.html | Institutional observation applications |
| civil.html | Civil, commercial and environmental applications |
| company.html | Company narrative, interactive 2023–2029+ journey and FAQ |
| investors.html | Development and financing overview |
| careers.html | Filterable professional disciplines |
| contact.html | Enquiry preparation and contact details |
| platform.html | Interactive conceptual platform preview and demonstration request |
| news.html | Searchable, filterable news archive and article overlays |
| news-editor.html | Local editorial utility; exclude from the public deployment |

## Demonstration requests

Select **Request demo** in the navigation. Enter the institution, email address, application focus and demonstration objectives. **Prepare demonstration email** opens a draft addressed to `info@r4space.com`. The visitor reviews and sends it in their email application. **Copy request** provides a fallback.

This static implementation does not send email automatically, store form submissions or book appointments. A backend would be required for direct submission without an email client. No email was sent during validation.

## Interactive features

- Image-led homepage, section reveals, reading-progress indicator and reduced-motion support.
- Global accessible demonstration-request dialog with required-field validation and copy fallback.
- Satellite-cluster terminology and removal of trademark symbols throughout the generated public pages.
- Interactive architecture selector, column highlighting, an expandable 15-dimension table and a qualitative modality-versus-synchronicity chart.
- Hypothetical constant-speed displacement calculator: displacement = speed × acquisition offset.
- Six selectable journey milestones with previous/next navigation and historical/planned status labels.
- Platform-preview modality selection, synthetic event inspection, timeline controls and illustrative JSON evidence export.
- News category/year/keyword filters, pagination, article dialogs and draft/published states.
- Image-enlargement dialogs and eight new generated conceptual images.
- Existing FAQ search, career filtering and contact interactions retained.

## Update news and events

1. Open `news-editor.html` from the extracted website directory.
2. Select an existing announcement or create a new one.
3. Enter the exact title, category, date precision, summary, article and optional public evidence URL.
4. Select Draft or Published. Draft records are excluded from public news.
5. Choose **Apply to session** to incorporate the form values.
6. Choose **Export news-data.js** and replace `assets/news-data.js` in the website directory with the downloaded file.
7. Review `news.html` and the homepage, then deploy the updated data file to the host.

Import accepts a previously exported JavaScript data file or equivalent JSON. The editing utility operates in memory; it does not authenticate users or modify a hosted website. Export changes before closing or refreshing. Apply any field changes before exporting. Preserve the original filename `news-data.js` when replacing the asset. Do not deploy the editing page or source folder publicly.

Dates may be a year, year-month or full date. Do not invent an exact announcement day where only the year is known. Use factual status distinctions: shortlisting, selection, award, disbursement and completion are different milestones. The existing award record is based on the supplied company certificate; other institutional records are based on company-provided information. The included editorial award template remains a draft and is excluded from public results.

This section supports ongoing editorial updates; it does not automatically retrieve announcements from external services.

## Figures and imagery

- `assets/sensor-synchronicity.svg`: editable vector comparison figure.
- `assets/sensor-synchronicity.png`: 2120-pixel-wide raster rendering of the same figure.
- `assets/images/`: eight built-in image-generation outputs used throughout the website.
- `source/image-prompts.json`: complete prompt set, method and asset mapping.

The figure is categorical and qualitative. Horizontal coordinates are not measured timing values, numerical scores or operator benchmarks. Showing all modality families does not claim that every system carries every sensor.

Generated images are conceptual illustrations. They are not actual R4 spacecraft, facilities, event photographs or measured Earth-observation products. Platform SAR and thermal modes are explicitly labelled visual interface concepts, not physical simulations or sensor retrievals.

## Maintenance and regeneration

Edit `source/build_site.py` for the baseline content and `source/enhancements.py` for the interactive extension. Run:

```bash
python3 source/build_site.py
```

The generator uses the Python standard library. It preserves an existing `assets/news-data.js` and regenerates the HTML plus shared CSS/JavaScript source. Direct edits to generated HTML will be overwritten. The PNG graph is a rendered copy of the SVG; rerender it if the vector diagram changes. The supplied PNG was rendered using Inkscape.

## Hosting

Production has not been modified. Upload the 11 public HTML files, `assets/`, sitemap, robots file and the routing configuration appropriate to the actual host. Keep `news-editor.html`, `source/` and documentation outside the production document root.

`.htaccess` provides an Apache example; `_redirects` provides a compatible static-host rewrite example. Preserve or merge existing host settings and verify the extensionless URLs before replacing production files. These examples were not executed against the actual r4space.com hosting environment. Canonical metadata assumes `https://www.r4space.com/`.

## Validation completed

- 12 HTML files passed 578 structural, label, internal-link, fragment, metadata, structured-data and JavaScript-syntax checks.
- All 37 static image/script references resolved; eight concept-image files are present.
- Eight news records validated structurally: seven published announcements and one draft.
- No trademark symbols or spacecraft-class labels remain in the generated HTML.
- Desktop homepage visually reviewed in the browser.
- Demonstration dialog opening, required input, copying and closing verified with synthetic data.
- Architecture selection, comparison expansion and displacement calculation verified in the browser.
- Journey selection and navigation verified in the browser.
- Platform modality switching, synthetic-event selection and timeline-range changes verified in the browser.
- The standalone comparison figure was rendered and visually inspected.

Browser transport disconnected before the final news-editor, playback/export and full responsive regression checks could be completed. These controls have source and syntax checks but not complete browser verification in this revision. Email-client launch and actual delivery remain device-dependent and were not tested end to end. No formal accessibility certification or full cross-browser assessment is claimed.
