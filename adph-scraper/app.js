const fs = require('fs');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

console.log("Sending HTTP request...");
nightmare
  .on('console', (log, msg) => {
    console.log(msg)
  })
  .goto('https://foodscores.state.al.us/(S(ruzubhfw1i1v4p55wubjwrv3))/default.aspx')
  .type('#ctl00_ContentPlaceHolder1_txtCity', 'Harvest')
  .click('#ctl00_ContentPlaceHolder1_BtnSearch')
  .wait('#ctl00_ContentPlaceHolder1_DtList')
  .evaluate(() => {

    let ratings = [];
    let itemId = 0;

    let establishmentId = undefined;
    let addressId = undefined;
    let cityId = undefined;
    let zipCodeId = undefined;
    let scoreId = undefined;
    let inspectionDateId = undefined;

    do {
      let formattedItemId = itemId.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });

      establishmentId = `#ctl00_ContentPlaceHolder1_DtList_ctl${formattedItemId}_LblEst`;
      addressId = `#ctl00_ContentPlaceHolder1_DtList_ctl${formattedItemId}_LnkAdd`;
      cityId = `#ctl00_ContentPlaceHolder1_DtList_ctl${formattedItemId}_Label1`;
      zipCodeId = `#ctl00_ContentPlaceHolder1_DtList_ctl${formattedItemId}_Label2`;
      scoreId = `#ctl00_ContentPlaceHolder1_DtList_ctl${formattedItemId}_LblScore`;
      inspectionDateId = `#ctl00_ContentPlaceHolder1_DtList_ctl${formattedItemId}_LblInDt`;

      const item = {
        establishment: document.querySelector(establishmentId).textContent,
        address: document.querySelector(addressId).textContent,
        city: document.querySelector(cityId).textContent,
        zipCode: document.querySelector(zipCodeId).textContent,
        score: document.querySelector(scoreId).textContent,
        inspectionDate: document.querySelector(inspectionDateId).textContent,
      };

      ratings.push(item);

      // Get the next establishment id for the while loop condition
      itemId++;
      formattedItemId = itemId.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
      establishmentId = `#ctl00_ContentPlaceHolder1_DtList_ctl${formattedItemId}_LblEst`;
    }
    while (document.querySelector(establishmentId) != null);
    

    return ratings;
  })
  .end()
  .then(data => fs.writeFileSync('data.json', JSON.stringify(data)))
  .catch(error => {
    console.error('Search failed:', error)
  });