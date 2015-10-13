/**
Template Controllers

@module Templates
*/

var accounts,
    template,
    checkLatestBlocks = function(err, hash){
        if(err)
            return;
        
        var allAccounts = accounts.list(),
            nodeAccounts = EthAccounts.find().fetch();
        
        // If node accounts is activated
        if(PocketBook.options.nodeAccounts
          && _.isArray(allAccounts)
          && _.isArray(nodeAccounts))
            allAccounts = allAccounts.concat(nodeAccounts);
        
        _.each(allAccounts, function(account, accountIndex){  
            web3.eth.getBalance(account.address, function(err, result){
                if(err)
                    return;
                
                var balances = LocalStore.get('balances');
                balances[account.address] = result.toNumber(10);
                LocalStore.set('balances', balances);
            });
        });
    };

/**
The pocketbook view template

@class [template] views_pocketbook
@constructor
*/

Template['views_pocketbook'].onCreated(function(){
    if(PocketBook.objects.accounts == null)
        accounts = new Accounts();
    else
        accounts = PocketBook.objects.accounts;
    
    // Set template
    template = this;
    
    // Setup Balances
    LocalStore.set('balances', {});
    
    // Set Default web3 Account
    if(PocketBook.options.selectedAsDefault)
        web3.eth.defaultAccount = accounts.get('selected');
});
    
Template['views_pocketbook'].onRendered(function(){
    // setup one unsecure account if no exist
    if(accounts.length == 0)
        accounts.new();
    
    // Setup Node Accounts
    if(PocketBook.options.nodeAccounts)
        EthAccounts.init();
    
    // Check Balances option
    if(PocketBook.options.checkBalances)
        web3.eth.filter('latest').watch(checkLatestBlocks);
});

Template['views_pocketbook'].events({
    /**
    Get the name
    
    @event (click .btn-pocketbook-new)
    */

    'click .btn-pocketbook-new': function(event, template){ 
        var account = {};
        
        if(PocketBook.promts.new == null)
            account = accounts.new(prompt("Please enter a account passphrase (minimum 6 character)", ""));
        else
            account = accounts.new(PocketBook.promts.new);
        
        PocketBook.callbacks.onNew(account.address);
    },
    
    /**
    Get the name
    
    @event (click .btn-pocketbook-backup)
    */

    'click .btn-pocketbook-backup': function(event, template){
        accounts.backup();
        
        PocketBook.callbacks.onBackup();
    },
    
    /**
    Get the name
    
    @event (click .btn-pocketbook-import)
    */

    'click .btn-pocketbook-import': function(event, template){
        PocketBook.callbacks.onImport();
    },
    
    /**
    Get the name
    
    @event (click .btn-pocketbook-export)
    */

    'click .btn-pocketbook-export': function(event, template){
        PocketBook.callbacks.onExport();
    },
    
    /**
    Get the name
    
    @event (click .btn-pocketbook-clear)
    */

    'click .btn-pocketbook-clear': function(event, template){
        accounts.clear();
        
        PocketBook.callbacks.onClear();
    },
    
    /**
    Select a pocketbook account
    
    @event (click .btn-pocketbook-select)
    */

    'click .list-pocketbook-account': function(event, template){
        if($(event.target).is('button')
          || !PocketBook.options.canSelect)
            return;
        
        var element = $(event.target).closest('.list-pocketbook-account'),
            data = element[0].dataset;
        
        if(PocketBook.options.selectedAsDefault)
            web3.eth.defaultAccount = data.address;
        
        var nodeAccounts = EthAccounts.find().fetch(),
            browserAccounts = accounts.list();
        
        if(!PocketBook.options.canNodeSelect
          && _.contains(nodeAccounts, data.address))
            return;
            
        if(!PocketBook.options.canBrowserSelect
          && _.contains(browserAccounts, data.address))
            return;
        
        accounts.select(data.address);
        PocketBook.callbacks.onSelect(data.address);
    },
    
    /**
    Remove a pocketbook account
    
    @event (click .btn-pocketbook-remove)
    */

    'click .btn-pocketbook-remove': function(event, template){
        var element = $(event.target).closest('.list-pocketbook-account'),
            data = element[0].dataset,
            removeAccount = false;
        
        if(PocketBook.promts.remove == null)
            removeAccount = confirm("Do you really want to delete account " + data.address + " from browser storage?", "");
        else
            removeAccount = PocketBook.promts.remove();
        
        if(!removeAccount)
            return;
        
        accounts.remove(data.address);       
        PocketBook.callbacks.onRemove(data.address);
    },
    
    /**
    Faucet an account
    
    @event (click .btn-pocketbook-faucet)
    */

    'click .btn-pocketbook-faucet': function(event, template){
        var element = $(event.target).closest('.list-pocketbook-account'),
            data = element[0].dataset,
            faucetAccount = false;
        
        if(PocketBook.promts.faucet == null)
            faucetAccount = confirm("Do you really want to faucet ether to  " + data.address + "?", "");
        else
            faucetAccount = PocketBook.promts.remove();
        
        if(!faucetAccount)
            return;
        
        PocketBook.callbacks.onFaucet(data.address);
    },
});

Template['views_pocketbook'].helpers({
    /**
    Refresh the current wallet

    @method (refresh)
    */

    'refresh': function(){
        checkLatestBlocks(null, '');  
    },
    
    /**
    Get node accounts off of the connected geth or cpp node

    @method (nodeAccounts)
    */

    'nodeAccounts': function(){
        return EthAccounts.find().fetch();
    },
    
    /**
    Get the accounts stored in browser

    @method (browserAccounts)
    */

    'browserAccounts': function(){
        return accounts.list();
    },
    
    /**
    Get the options stored/set in PocketBook global

    @object (options)
    */

    'options': PocketBook.options,
});