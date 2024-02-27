function OSC(in, lenght_in) {
    this.i_c = in.i_c;
    this.i_ph = in.i_ph;
    this.i_s = in.i_s;
    this.lenght_in = lenght_in;
}

OSC.prototype.up = function() {
    if (this.i_c >= this.lenght_in) {
        this.i_c = 1;
    }
    this.i_c++;
    if (this.i_c == 1) {
        this.i_ph++;
    }
    if (this.i_ph > 4) {
        this.i_ph = 1;
    }
    return this;
};

OSC.prototype.down = function() {
    this.i_c--;
    if (this.i_c <= 0) {
        this.i_c = this.lenght_in - 1;
    }
    if (this.i_c == (this.lenght_in - 1)) {
        this.i_ph--;
    }
    if (this.i_ph <= 0) {
        this.i_ph = 4;
    }
    return this;
};

OSC.prototype.state = function() {
    if (this.i_ph == 1) {
        this.i_s = this.i_c;
    } else if (this.i_ph == 2) {
        this.i_s = (this.i_c  *  -1) + (this.lenght_in - 1);
    } else if (this.i_ph == 3) {
        this.i_s = this.i_c  *  -1;
    } else if (this.i_ph == 4) {
        this.i_s = this.i_c + ((this.lenght_in  *  -1) + 1);
    }
    return this;
};

