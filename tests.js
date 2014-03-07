var where = function (source, predicate) {
    return source.filter(predicate);
};

var where = function (source, predicate) {
    var results = [];

    for (var i = 0; i < source.length; i++)
        if (predicate(source[i]))
            results.push(source[i]);

    return results;
};

var select = function (source, selector) {
    return source.map(selector);
};

var select = function (source, selector) {
    var results = [];

    for (var i = 0; i < source.length; i++)
        results.push(selector(source[i]));

    return results;
};

module("where");

    test("where on empty collection returns empty collection", function () {
        var result = where([], function (i) { return true; });
        equal(result.length, 0);
    });

    test("where on non empty collection with true as predicate returns all items in source", function () {
        var source = [1, 2, 3];
        var result = where(source, function (i) { return true; });
        equal(result.length, source.length);
    });

    test("where on non empty collection with false as predicate returns empty collection", function () {
        var source = [1, 2, 3];
        var result = where(source, function (i) { return false; });
        equal(result.length, 0);
    });

    test("where on non empty collection with complex predicate returns matching items from source", function () {
        var source = [1, 2, 3, 4];
        var result = where(source, function (i) { return i  % 2 != 0; });
        equal(result.length, 2);
    });

module("select");

    test("select on empty collection returns empty collection", function () {
        var source = [];
        var result = select(source, function (i) { return i; });
        equal(result.length, 0);
    });

    test("select on non empty collection projects all items in collection", function () {
        var source = [1, 2, 3];
        var result = select(source, function (i) { return i+1; });
        deepEqual(result, [2, 3, 4]);
    });

    test("select results arent always the same type", function () {
        var source = [1, 2, 3];

        var crazySelector = function(i) {
            if (i % 2 == 0)
                return i.toString();

            return i;
        };

        var result = select(source, crazySelector);
        deepEqual(result, [1, "2", 3]);
    });

