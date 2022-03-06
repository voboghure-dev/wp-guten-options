import "./admin.scss";
import { Icon } from "@wordpress/components";
import { Fragment, render, Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

class App extends Component {
	constructor() {
		super(...arguments);
	}

	render() {
		return (
			<Fragment>
				<div className="wholesome-plugin__header">
					<div className="wholesome-plugin__container">
						<div className="wholesome-plugin__title">
							<h1>
								{__("Wholesome Plugin Settings", "wp-guten-options")}{" "}
								<Icon icon="admin-plugins" />
							</h1>
						</div>
					</div>
				</div>
				<div className="wholesome-plugin__main"></div>
			</Fragment>
		);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const htmlOutput = document.getElementById("wp-guten-options-settings");


	if (htmlOutput) {
		render(<App />, htmlOutput);
	}
});
