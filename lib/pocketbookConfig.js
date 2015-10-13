PocketBook = {
    options: {
        canFaucet: true,
        canRemove: true,
        canClear: true,
        canCreate: true,
        canBackup: true,
        canSelect: true,
        canExport: true,
        canImport: true,
        selectedAsDefault: true,
        checkBalances: true,
        etherUnit: 'ether',
        nodeAccounts: true,
        canNodeSelect: true,
        canBrowserSelect: true,
    },
    objects: {
        accounts: null,
        names: {},
    },
    promts: {
        new: null,
        remove: null,
        faucet: null,
    },
    callbacks: {
        onFaucet: function(address){},
        onNew: function(address){},
        onBackup: function(){},
        onImport: function(rawImport){},
        onExport: function(rawExport){},
        onClear: function(){},
        onSelect: function(address){},
        onRemove: function(address){},
    }
};

PocketBook.Options = function(optionsObject){
    this.options = _.extend(this.options, optionsObject);
};

PocketBook.Names = function(namesObject){
    this.objects.names = _.extend(this.objects.names, namesObject);
};

PocketBook.Accounts = function(accountsInstance){
    this.objects.accounts = accountsInstance;
};

PocketBook.RemovePromt = function(method){
    this.promts.remove = method;
};

PocketBook.FaucetPromt = function(method){
    this.promts.faucet = method;
};

PocketBook.NewPromt = function(method){
    this.promts.new = method;
};

PocketBook.onFaucet = function(method){
    this.callbacks.onFaucet = method;
};

PocketBook.onNew = function(method){
    this.callbacks.onNew = method;
};

PocketBook.onBackup = function(method){
    this.callbacks.onBackup = method;
};

PocketBook.onImport = function(method){
    this.callbacks.onImport = method;
};

PocketBook.onExport = function(method){
    this.callbacks.onExport = method;
};

PocketBook.onClear = function(method){
    this.callbacks.onClear = method;
};

PocketBook.onSelect = function(method){
    this.callbacks.onSelect = method;
};

PocketBook.onRemove = function(method){
    this.callbacks.onRemove = method;
};