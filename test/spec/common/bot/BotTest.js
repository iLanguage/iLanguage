var Bot = {};

xdescribe("Test Bot", function() {
  it("should create a bot", function() {
    var b = new Bot();
    var isaBot = b instanceof Bot;
    expect(isaBot).toBeTruthy();

  });
  it("should create multiple bots", function() {
    var bots = [];
    bots.push(new Bot());
    bots.push(new Bot());
    bots.push(new Bot());

    expect(bots.length === 3).toBeTruthy();
  });
});
