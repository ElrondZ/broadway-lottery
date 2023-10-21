export async function broadwayDirect({ browser, userInfo, url }) {
  const page = await browser.newPage();

  await page.goto(url);

  const links = await page.getByRole("link", { name: /Enter/i }).all();

  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const href = await link.getAttribute("href");

    if (!href) {
      continue;
    }
    await page.goto(href);

    await page.getByLabel("First Name").fill(userInfo.firstName);
    await page.getByLabel("Last Name").fill(userInfo.lastName);
    await page
      .getByLabel("Qty of Tickets Requested")
      .selectOption(userInfo.numberOfTickets);
    await page.getByLabel("Email").fill(userInfo.email);

    // Enter Date of Birth
    await page.locator("#dlslot_dob_month").fill(userInfo.dateOfBirth.month);
    await page.locator("#dlslot_dob_day").fill(userInfo.dateOfBirth.day);
    await page.locator("#dlslot_dob_year").fill(userInfo.dateOfBirth.year);

    await page.getByLabel("Zip").fill(userInfo.zip);
    await page
      .getByLabel("Country of Residence")
      .selectOption({ label: userInfo.countryOfResidence });

    // Agree to terms
    await page.locator("#dlslot_agree").check({ force: true });

    // Submit the form
    await page.getByLabel("Enter").click();
  }

  await browser.close();
}
