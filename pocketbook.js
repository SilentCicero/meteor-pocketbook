/**
Template Controllers

@module Templates
*/

var accounts,
    template,
    checkLatestBlocks = function(err, hash){
        if(err)
            return;
        
        var batch = web3.createBatch();
        
        _.each(accounts.list(), function(account, accountIndex){
            batch.add(web3.eth.getBalance(account.address, function(err, result){
                if(err)
                    return;
                
                var balances = TemplateVar.get(template, 'balances');
                balances[account.address] = result.toNumber(10);
                TemplateVar.set(template, 'balances', balances);
            }));
        });
        
        try{
            batch.execute();
        }catch(e){}
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
    TemplateVar.set('balances', {});
    
    // Set Default web3 Account
    if(PocketBook.options.selectedAsDefault)
        web3.eth.defaultAccount = accounts.get('selected');
});
    
Template['views_pocketbook'].onRendered(function(){
    // setup one unsecure account if no exist
    if(accounts.length == 0)
        accounts.new();
    
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
    Get the name

    @method (name)
    */

    'accounts': function(){
        return accounts.list();   
    },
    
    /**
    Get PocketBook settings

    @method (options)
    */

    'getBalance': function(address){
        var balances = TemplateVar.get('balances');
        
        return web3.fromWei(balances[address], PocketBook.options.etherUnit);
    },
    
    /**
    Get PocketBook settings

    @method (options)
    */

    'options': PocketBook.options,
    
    /**
    Get the name

    @method (isSelected)
    */

    'isSelected': function(address){
        var selected = accounts.get('selected');
        
        if(!_.isUndefined(selected))
            return selected.address == address;
    }
});