Template['components_pocketbookAccount'].helpers({
    /**
    Get the current account balance

    @method (getBalance)
    */

    'getBalance': function(address){
        var balances = LocalStore.get('balances');
        
        return web3.fromWei(balances[address], PocketBook.options.etherUnit);
    },
    
    /**
    Get the name

    @method (isSelected)
    */

    'isSelected': function(address){
        var selected = accounts.get('selected');
        
        if(!_.isUndefined(selected))
            return selected.address == address;
    },
    
    /**
    Get the options stored/set in PocketBook global

    @object (options)
    */

    'options': PocketBook.options,
}); 