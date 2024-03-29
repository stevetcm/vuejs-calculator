new Vue({
	el: '#section-calculator',
	data: {
		calculation: '0',
		tempResult: '',
		resultStyle: {
			fontSize: '40px'
		}
	},
	methods: {
		clear() {
			this.calculation = '0';
			this.tempResult = '';
		},
		append(value) {
			if (this.calculation == '0') {
				this.calculation = value.toString();
			} else if (/-|\+|\*|\//g.test(this.calculation.slice(-2,-1)) && value.length > 1) {
				this.calculation = this.calculation.slice(0, -3) + value.toString();
			} else {
				this.calculation += value.toString();
			}
		},
		getResult() {
			if (this.tempResult != '') {
				this.calculation = this.tempResult;
			}
		},
		backspace() {
			if (this.calculation.length == 1) {
				this.calculation = '0';
			} else if (this.calculation.slice(-1) == ' ') {
				this.calculation = this.calculation.slice(0, -3);
			} else {
				this.calculation = this.calculation.slice(0, -1);
			}
			
		}
	},
	watch: {
		calculation() {
			if (this.calculation != this.result) {
				this.tempResult = this.result.toString();
			} else if (!this.calculation.includes(' ')) {
				this.tempResult = '';
			}
		},
		tempResult() {
			if (this.tempResult.length > 19) {
				this.resultStyle.fontSize = '18px';
			} else if (this.tempResult.length > 16) {
				this.resultStyle.fontSize = '21px';
			} else if (this.tempResult.length > 13) {
				this.resultStyle.fontSize = '25px';
			} else if (this.tempResult.length > 10) {
				this.resultStyle.fontSize = '31px';
			} else {
				this.resultStyle.fontSize = '40px';
			}
		}
	},
	computed: {
		result() {
			if (/-|\+|\*|\//g.test(this.calculation.slice(-2,-1))) {
				return eval(this.calculation.slice(0, -3));
			} else {
				return eval(this.calculation);
			}
		}
	},
	filters: {
		hugeNumber: (value) => {
		 	let parts = value.toString().split(".");
		 	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
	  	},
	  	modified: (value) => {
	  		return value.replace(/\*/g, '×').replace(/\//g, '÷');
	  	}
	}
});
