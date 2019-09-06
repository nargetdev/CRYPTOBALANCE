/**
 * CODE LICENSED UNDER THE CREATIVE COMMON BY-NC-ND LICENSE.
 * https://creativecommons.org/licenses/by-nc-nd/4.0/
 * 
 * Copyright 2019 by cryptofinance.ai
 */


/**
 * @OnlyCurrentDoc
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('CRYPTOFINANCE')
      .addItem('How to refresh rates', 'ShowRefreshInfo')
      .addSeparator()
      .addItem('Set Data Availability plan API Key', 'ShowAPIKeyDataAvaibilityPrompt')
      .addSeparator()
      .addItem('Set Historical Data plan API Key', 'ShowAPIKeyHistPlanPrompt')
      .addSeparator()
      .addItem('Documentation', 'ShowDoc')
      .addToUi();
  ui.createMenu('CRYPTOBALANCE')
      .addItem('Refresh Balances', 'ShowHowToRefresh')
      .addSeparator()
      .addItem('Contact Info', 'ShowContactInfo')
      .addToUi();
  ui.createMenu('CRYPTOLENDING')
      .addItem('Available Lending PLateforms', 'ShowAvailableExchanges')
      .addSeparator()
      .addItem('Available Token Name', 'ShowHowAvailableTokens')
      .addSeparator()
      .addItem('Lending Side', 'ShowSides')
      .addSeparator()
      .addItem('Show Example', 'ShowExample')
      .addSeparator()
      .addItem('Contact Info', 'ShowContactInfo')
      .addToUi();  
}


/**
 * @OnlyCurrentDoc
 */
function ShowAPIKeyDataAvaibilityPrompt() {
  var ui = SpreadsheetApp.getUi();
  var userProperties = PropertiesService.getUserProperties();
  var api_key = userProperties.getProperty("APIKEYDATAAVAIBILITYSERVICE")

  if (api_key) {
    var result = ui.prompt('Set API Key for Data Availability Service',
                           '✅ Your API '+ api_key +' key is already set.\n\nYour CRYPTOFINANCE calls are sent to the Data Availability Proxy API.\nYou can still re-enter it below to override its current value:',
                           ui.ButtonSet.OK_CANCEL);
  }
  else {
    var result = ui.prompt('Set API Key for Data Availability Service',
                           'The Data Availability Service offers unlimited data from CoinMarketCap and helps you avoid errors due to exchanges API ban and overload.\nExchanges ban Google Sheets servers IP addresses when too many requests originate from them.\nIt also provides you with more exchanges and markets data.\n\nMore info here: https://cryptofinance.ai/data-availability-service\n\nOnce subscribed, please enter your API Key below:',
                           ui.ButtonSet.OK_CANCEL);  
  }
  
  var button = result.getSelectedButton();
  var user_input = result.getResponseText().replace(/\s+/g, '');
  if (button == ui.Button.OK) {
    if (user_input && user_input == "__DELETE__") {
      userProperties.deleteProperty("APIKEYDATAAVAIBILITYSERVICE");
      ui.alert('API Key Removed',
               'Your API Key has been sucessfully removed.\nYour requests will not be sent to the Data Availability Proxy API anymore.'
               ,ui.ButtonSet.OK);
    }
    else if (user_input && (user_input.length == 36 || user_input.length == 20)) {
      userProperties.setProperty("APIKEYDATAAVAIBILITYSERVICE", user_input);
      ui.alert('API Key successfully saved',
               'Your requests will now be sent to the CRYPTOFINANCE Data Availability Service.\nWhenever an exchange API is overloaded you will keep getting data.\n\nBe sure to refresh the cells: Select cells calling CRYPTOFINANCE (or all with Cmd+A), hit Delete key, wait 3sec,\nand then undo the delete with Cmd+Z.\n(If you\'re on Windows use the Ctrl key instead of Cmd)\n\nYou can contact support@cryptofinance.ai if you have any question.'
               ,ui.ButtonSet.OK);
    }
    else if (user_input) {
      ui.alert('API Key not valid',
               'The API Key you entered appears to be not valid.\nIf you believe this is an error, contact support@cryptofinance.ai.'
               ,ui.ButtonSet.OK);
    }
  }
}


/**
 * @OnlyCurrentDoc
 */
function ShowAPIKeyHistPlanPrompt() {
  var ui = SpreadsheetApp.getUi();
  
  var userProperties = PropertiesService.getUserProperties();
  var api_key = userProperties.getProperty("APIKEY_HISTPLAN")
  if (api_key) {
    var result = ui.prompt('Set API Key for the Historical Data plan',
                           '✅ Your API '+ api_key +' key is already set.\n\nYou can now use the historical data syntaxes in your sheet.\n\nYou can still re-enter it below to override its current value:',
                           ui.ButtonSet.OK_CANCEL);
  }
  else {
    var result = ui.prompt('Set API Key for the Historical Data plan',
                        'The Historical Data plan gives you access to hourly historical data of 196 exchanges.\nIncluding hourly open, high, low, close and volume info.\nATH (All Time High) prices and volume per exchange and custom sparklines.\n\nMore info at https://cryptofinance.ai/crypto-historical-data\n\nOnce subscribed, please enter your API Key below:',
                        ui.ButtonSet.OK_CANCEL);
  }
  var button = result.getSelectedButton();
  var text = result.getResponseText().replace(/\s+/g, '');  
  if (button == ui.Button.OK) {
    if (text && text == "__DELETE__") {
      var userProperties = PropertiesService.getUserProperties();
      userProperties.deleteProperty("APIKEY_HISTPLAN");
      ui.alert('API Key Removed',
               'Your API Key has been sucessfully removed.\nYour requests will not be sent to the Data Availability Proxy API anymore.'
               ,ui.ButtonSet.OK);
    }
    else if (text && (text.length == 36 || text.length == 20)) {
      var userProperties = PropertiesService.getUserProperties();
      userProperties.setProperty("APIKEY_HISTPLAN", text);
      ui.alert('API Key successfully saved',
               'You can now use the historical data syntaxes in your sheet.\n\nIt looks like this: =CRYPTOFINANCE("BTC/USD", "price", "2017-12-25@17:00")\n\nSee the doc for all options: https://cryptofinance.ai/docs/cryptocurrency-bitcoin-historical-prices/\n'
               ,ui.ButtonSet.OK);
    }
    else if (text) {
      ui.alert('API Key not valid',
               'The API Key you entered appears to be not valid.\nIf you believe this is an error, contact support@cryptofinance.ai.'
               ,ui.ButtonSet.OK);
    }
  }
}


/**
 * @OnlyCurrentDoc
 */
function ShowDoc() {
  var ui = SpreadsheetApp.getUi()
  ui.alert("Documentation and Info",
           'Official website: https://cryptofinance.ai\n\
            Documentation: https://cryptofinance.ai/docs/\n\
            Support email: support@cryptofinance.ai',
            ui.ButtonSet.OK)
}



/**
 * @OnlyCurrentDoc
 */
function ShowRefreshInfo() {
  var ui = SpreadsheetApp.getUi()
  ui.alert("How to refresh rates",
           'We recommend setting up a manual refresh trigger.\nSee the doc at this address for more info:\nhttps://cryptofinance.ai/docs/how-to-refresh-rates/',
            ui.ButtonSet.OK)
}


function cast_matrix__(el) {
  if (el === "") {
    return "-"
  }
  else if (el.map) {return el.map(cast_matrix__);}
  try {
    var out = Number(el)
    if ((out === 0 || out) && !isNaN(out)) {
      if (el.length > 1 && el[1] == 'x') {
        return el
      }
      else {
        return out
      }
    }
    else {
      return el
    }
  }
  catch (e) {return el;}
}


/**
 * Returns cryptocurrencies price and other info.
 *
 * @param {"EXCHANGE:BASE/QUOTE"} market The market data to fetch, default is BTC/USD. Default EXCHANGE is CoinMarketCap. When no QUOTE currency is set, default is USD.
 * @param {"price|marketcap|volume|change|name|rank|max_supply|total_supply|circulating_supply"} attribute What to return, default is price. Some exchanges provide more info than others. Refer to the documentation for the full list. 
 * @param {"Any supported period or date or empty string"} option Used to narrow down the attribute value by date or period. Use an empty string "" if you want to use a cell to force the refresh. Different attributes have different options. Refer to the doc for the supported syntaxes.
 * @param {"Empty cell reference"} refresh_cell ONLY on 4th argument. Reference an empty cell and change its content to force refresh the rates. See the doc for more info.
 * @return The current or historical price, volume, change, marketcap, name, rank, and more.
 * @customfunction
 */
function CRYPTOFINANCE(market, attribute, option, refresh_cell) {

  // Sanitize input
  var market = (market+"") || "";
  var attribute = (attribute+"") || "";
  var option = (option+"") || "";

  // Get user anonymous token (https://developers.google.com/apps-script/reference/base/session#getTemporaryActiveUserKey())
  // Mandatory to authenticate request origin
  var GSUUID = encodeURIComponent(Session.getTemporaryActiveUserKey());
  // Get Data Availability Service and Historical Plan API Keys, if any
  var userProperties = PropertiesService.getUserProperties();
  var APIKEYDATAAVAIBILITYSERVICE = userProperties.getProperty("APIKEYDATAAVAIBILITYSERVICE") || "";
  var APIKEY_HISTPLAN = userProperties.getProperty("APIKEY_HISTPLAN") || "";
  
  // Fetch data
  try {

    var data = {};
    var CACHE_KEY = "CF__"+ market.toLowerCase() + "_" + attribute.toLowerCase() + "_" + option.toLowerCase();
    // First check if we have a cached version
    var cache = CacheService.getUserCache();
    var cached = cache.get(CACHE_KEY);
    if (cached && cached != null && cached.length > 1) {
      data = JSON.parse(cached)
    }
    // Else, fetch it from API and cache it
    else {
      var url = "https://api.cryptofinance.ai/v1/data?histplanapikey=" + APIKEY_HISTPLAN + "&gsuuid=" + GSUUID + "&dataproxyapikey=" + APIKEYDATAAVAIBILITYSERVICE;
      url += "&m=" + market;
      url += "&a=" + attribute;
      url += "&o=" + option;
      url += "&s=os";
      // Send request
      var response = UrlFetchApp.fetch(url, {muteHttpExceptions: true, validateHttpsCertificates: true})
      data = JSON.parse(response.getContentText());
      // Stop here if there is an error
      if (data["error"] != "") {
        throw new Error(data["error"])
      }
      // If everything went fine, cache the raw data returned
      else if (response && response.getResponseCode() == 200 && data.length > 1 && data.length < 99900) {
        cache.put(CACHE_KEY, response.getContentText(), data["caching_time"] || 60)
      }
    }

    // Return with the proper type
    var out = "-";
    if (data["type"] == "float") {
      out = parseFloat(data["value"]);
    }
    else if (data["type"] == "int") {
      out = parseInt(data["value"]);
    }
    else if (data["type"] == "csv") {
      out = Utilities.parseCsv(data["value"]);
      out = cast_matrix__(out);
    }
    else {
      out = data["value"]
    }
    return out;

  }

  catch (e) {
    var msg = e.message.replace(/https:\/\/api.*$/gi,'')
    throw new Error(msg)
  }
  
}

/**
 * 
 * CRYPTOBALANCE()
 * CRYPTOLENDING()
 * 
 * Copyright 2019 by charmantadvisory.com
 */

function ShowHowToRefresh() {
  var ui = SpreadsheetApp.getUi()
  ui.alert("Refresh Balances",
           'In your CRYPTOBALANCE function, add a 3rd argument to a locked reference cell, like A1. \nFrom now on every time you change the content of the cell A1, your data will be updated.\nExample:\n=BALANCE("BTC","35hK24tcLEWcgNA4JxpvbkNkoAcDGqQPsP","$A$1")',
            ui.ButtonSet.OK)
}
function ShowContactInfo() {
  var ui = SpreadsheetApp.getUi()
  ui.alert("Contact Info",
            'Support email: ac@charmantadvisory.com\n\
             Telegram Chat: https://t.me/TheCryptoCurious',
            ui.ButtonSet.OK)
}
function ShowAvailableExchanges() {
  var ui = SpreadsheetApp.getUi()
  ui.alert("Lending plateforms",
            'COMPOUND\n\DYDX\n\NUO',
            ui.ButtonSet.OK)
}
function ShowHowAvailableTokens() {
  var ui = SpreadsheetApp.getUi()
  ui.alert("Available Token Name",
           'Please check the available cryptocurrencies on the lending plateform and enter their ticker. Like for Ethereum, enter ETH',
            ui.ButtonSet.OK)
}
function ShowSides() {
  var ui = SpreadsheetApp.getUi()
  ui.alert("ShowSides",
           'APR_BORROW\n\APR_LEND',
            ui.ButtonSet.OK)
}
function ShowExample() {
  var ui = SpreadsheetApp.getUi()
  ui.alert("ShowExample",
           '=CRYPTOLENDING("COMPOUND","ETH","APR_BORROW")\n\ Gets the borrowing rate on compound for Ethereum.',
            ui.ButtonSet.OK)
}

/**CRYPTOBALANCE
 * Returns cryptocurrencies balances for the top 150 cryptocurrencies.
 *
 * @param {"CURRENCY TICKER"} The cryptocurrency TICKER/SYMBOL data to fetch, for example the symbol of Bitcoin is BTC.
 * @param {"PUBLIC WALLET ADDRESS"} associated to the cryptocurrency you want the balance from. Please pay attention, DO NOT TO ENTER your private wallet address.
 * @param {"EMPTY CELL REFERENCE"} refresh_cell ONLY on 3rd argument. Reference an empty cell and change its content to force refresh the balances.
 * @return The current amount of cryptocurrency on the searched public address.
 */

function CRYPTOBALANCE(ticker,address, refresh_cell){
  try{
    //

    ticker=ticker.toUpperCase();
    url="http://charmantadvisory.com/apiblock/"+ticker+"/"+address;
    var res = UrlFetchApp.fetch(url);
    var content = res.getContentText();

    return content;
  }

  catch(err){
      return "Error getting data";
  }

}
/**CRYPTOLENDING
 * Returns cryptocurrencies lending rates on different lending plateforms.
 *
 * @param {"EXCHANGE"} The exchange on which you want to retrieve the lending rate. data to fetch. Currently available exchanges: NUO, COMPOUND, DYDX.
 * @param {"TOKEN NAME"} associated to the cryptocurrency you want the lending from. Please pay attention on the available tickers on exchanges.
 * @param {"APR_BORROW or APR_LEND"} either APR_BORROW which corresponds to the borrowing rate or APR_LEND which corresponds to the lending rate.
 * @param {"EMPTY CELL REFERENCE"} refresh_cell ONLY on 3rd argument. Reference an empty cell and change its content to force refresh the balances.
 * @return the current lending rate in decimal form,  of cryptocurrency on the searched public address.
 */

function CRYPTOLENDING(exchange,ticker,side,refresh_cell){
  try{
    //

    ticker=ticker.toUpperCase();
    exchange=exchange.toUpperCase();
    side=side.toUpperCase();
    url="http://charmantadvisory.com/api/APR/"+exchange+"/"+ticker+"/"+side;
    var res = UrlFetchApp.fetch(url);
    var content = res.getContentText();

    return parseFloat(content);
  }

  catch(err){
    return "Currently available exchanges: NUO, COMPOUND, DYDX. Check fo avalable coins on exchanges if you get error. Contact: https://t.me/TheCryptoCurious for further support.";
  }

}
