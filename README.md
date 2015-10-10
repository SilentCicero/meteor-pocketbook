## Synopsis

A mini-wallet for MeteorJS dApps.

## About

While we wait for the Ethereum browsers and network to come into complete maturity, there is a need to house a mini ethereum wallet within our dApps. This is to do basic Ethereum account management in the browser. A primary use case would be, running an ethereum node, then connecting, through RPC, that node to your dApp hosted on a domain.

PocketBook provides your MeteorJS dApp with a simple and easy-to-use  Ethereum mini-wallet. PocketBook is equip with a browser-based Ethereum account management system (built with <a href="http://github.com/silentcicero/ethereumjs-accounts">ethereumjs-accounts</a>).

Please note that this Meteor module is still in Alpha. The security status of this module is still unknown and must still be vetted by trusted third-parties before production use.

## Hosted Alpha

<a href="http://meter-pocketbook.meteor.com">http://meter-pocketbook.meteor.com</a>

## Install

    $ meteor install silentcicero:meteor-pocketbook
    
## Usage

Note, the `PocketBook` object is set as a global variable in Meteor. You must setup your own route to the PocketBook view template `views_pocketbook`.

```javascript
// Setup A Route to the PocketBook view
Router.route('/pocketbook', {
    template: 'views_pocketbook',
    name: 'pocketbook'
});
```

PocketBook with a <a href="https://github.com/ConsenSys/hooked-web3-provider">HookedWeb3Provider</a> setup and in-browser web3 transaction signing.

```javascript
// Setup An ethereumjs-accounts instance
accounts = new Accounts();

// Setup a HookedWeb3Provider for in-browser account signing
// use Meteor.settings.public.httpProvider
var provider = new HookedWeb3Provider({
  host: 'http://localhost:8545',
  transaction_signer: accounts
});
web3.setProvider(provider);

// Setup PocketBook with Accounts Instance
PocketBook.Accounts(accounts);
```

PocketBook callback usage, note all other callbacks have no input variable for their callback method.

```javascript
PocketBook.onNew(function(address){
    console.log('My new account,', address); 
});

PocketBook.onFaucet(function(address){
    console.log('My faucet account,', address); 
});

PocketBook.onRemove(function(address){
    console.log('Removed account,', address); 
});

PocketBook.onSelect(function(address){
    console.log('Selected account,', address); 
});
```


## API

- [`PocketBook`](#pocketbook)
    - [`PocketBook` Properties](#pocketbook-properties)
        - [`Accounts.names`](#pocketbook-names)
        - [`Accounts.options`](#pocketbook-options)
    - [`PocketBook` Methods](#pocketbook-methods)
        - [`PocketBook.Options(optionsObject)`](#method-Options) 
        - [`PocketBook.Names(namesObject)`](#method-Names) 
        - [`PocketBook.Accounts(accountsInstance)`](#method-Accounts) 
        - [`PocketBook.NewPromt(method)`](#method-NewPromt)
        - [`PocketBook.RemovePromt(method)`](#method-NewPromt)
        - [`PocketBook.FaucetPromt(method)`](#method-NewPromt)
        - [`PocketBook.onFaucet(method)`](#method-onFaucet) 
        - [`PocketBook.onNew(method)`](#method-onNew) 
        - [`PocketBook.onBackup(method)`](#method-onBackup) 
        - [`PocketBook.onImport(method)`](#method-onImport) 
        - [`PocketBook.onExport(method)`](#method-onExport) 
        - [`PocketBook.onClear(method)`](#method-onClear) 
        - [`PocketBook.onSelect(method)`](#method-onSelect) 
        - [`PocketBook.onRemove(method)`](#method-onRemove)

## Options

These options will turn specific PocketBook features on and off. The `selectedAsDefault` option can be used if you want the `web3.eth.defaultAccount` to be set when a user selects an account with PocketBook. The `selectedAsDefault` option is set to `true` by default.

```javascript
PocketBook.Options({
    canFaucet: true,
    canRemove: true,
    canClear: true,
    canCreate: true,
    canBackup: true,
    canSelect: true,
    canExport: true,
    canImport: true,
    selectedAsDefault: true,
});
```
        
## Bootstrap

PocketBook contains classes that are Bootstrap 3.0 enabled. However, boostrap and custom CSS are also supported. Boostrap is not explicitly contained within PocketBook.

## CSS/LESS

```
.pocketbook
    &.container
    .pocketbook-header
    .pocketbook-subheader
    .list-pocketbook-nav
        .list-group-item
    .list-pocketbook-account
        &.selected
        .pocketbook-account-header
        .pocketbook-account-body
            .pocketbook-account-address
            .pocketbook-account-selected
        .pocketbook-account-faucet
            .btn-pocketbook-faucet
        .pocketbook-account-remove
            .btn-pocketbook-remove
        .pocketbook-account-footer
    .pocketbook-footer
```

## Names

All PocketBook names are stored in the `PocketBook.names` data object. Where `PockBook.names[SOME_ADDRESS_STRING] = 'SOME NAME';`. This can be integrated with a standard NameReg contract.

## Signing Transactions (in-browser)

Because PocketBook is built with ethereumjs-accounts, you may use the <a href="https://github.com/ConsenSys/hooked-web3-provider">HookedWeb3Provider</a> to do in-browser account signing with your PocketBook accounts.
        
## Components

* [underscore.js](http://underscorejs.org) v1.8.3
* [localstorejs](https://github.com/SilentCicero/LocalStore)  v0.1.9
* [ethereumjs-acccounts](https://github.com/silentcicero/ethereumjs-accounts) v0.0.12

## Security

Please use extreme caution when using this in any production or development level application. This wallet has not been verified secure by any organization or third-party. The security of this module is still unknown, and I do not in any way guarantee it to be secure or ready for production use.

## Licence

Released under the MIT License, see LICENSE file.