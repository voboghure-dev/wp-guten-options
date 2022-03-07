import { __ } from "@wordpress/i18n";
import api from "@wordpress/api";
import "./admin.scss";

import {
	Button,
	Icon,
	Panel,
	PanelBody,
	PanelRow,
	Placeholder,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
} from "@wordpress/components";

import { Fragment, render, Component } from "@wordpress/element";

import Notices from "./notices";
import { dispatch } from "@wordpress/data";

class App extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			exampleSelect: "",
			exampleText: "",
			exampleText2: "",
			exampleText3: "",
			exampleToggle: false,
			isAPILoaded: false,
		};
	}

	componentDidMount() {
		api.loadPromise.then(() => {
			this.settings = new api.models.Settings();

			const { isAPILoaded } = this.state;

			if (isAPILoaded === false) {
				this.settings.fetch().then((response) => {
					this.setState({
						exampleSelect:
							response["wp_guten_options_select"],
						exampleText:
							response["wp_guten_options_text"],
						exampleText2:
							response["wp_guten_options_text_2"],
						exampleText3:
							response["wp_guten_options_text_3"],
						exampleToggle: Boolean(
							response["wp_guten_options_toggle"]
						),
						isAPILoaded: true,
					});
				});
			}
		});
	}

	render() {
		const {
			exampleSelect,
			exampleText,
			exampleText2,
			exampleText3,
			exampleToggle,
			isAPILoaded,
		} = this.state;

		if (!isAPILoaded) {
			return (
				<Placeholder>
					<Spinner />
				</Placeholder>
			);
		}

		return (
			<Fragment>
				<div className="wp-guten-options__header">
					<div className="wp-guten-options__container">
						<div className="wp-guten-options__title">
							<h1>
								{__("Guten Options Settings", "wp-guten-options")}{" "}
								<Icon icon="admin-plugins" />
							</h1>
						</div>
					</div>
				</div>

				<div className="wp-guten-options__main">
					<Panel>
						<PanelBody
							title={__("Panel Body One", "wp-guten-options")}
							icon="admin-plugins"
						>
							<SelectControl
								help={__("An example dropdown field.", "wp-guten-options")}
								label={__("Example Select", "wp-guten-options")}
								onChange={(exampleSelect) => this.setState({ exampleSelect })}
								options={[
									{
										label: __("Please Select...", "wp-guten-options"),
										value: "",
									},
									{
										label: __("Option 1", "wp-guten-options"),
										value: "option-1",
									},
									{
										label: __("Option 2", "wp-guten-options"),
										value: "option-2",
									},
								]}
								value={exampleSelect}
							/>
						</PanelBody>
						<PanelBody
							title={__("Panel Body Two", "wp-guten-options")}
							icon="admin-plugins"
						>
							<TextControl
								help={__("This is an example text field.", "wp-guten-options")}
								label={__("Example Text", "wp-guten-options")}
								onChange={(exampleText) => this.setState({ exampleText })}
								value={exampleText}
							/>
						</PanelBody>
						<PanelBody
							title={__("Panel Body Three", "wp-guten-options")}
							icon="admin-plugins"
						>
							<PanelRow>
								<TextControl
									help={__(
										"Use PanelRow to place controls inline.",
										"wp-guten-options"
									)}
									label={__("Example Text 2", "wp-guten-options")}
									onChange={(exampleText2) => this.setState({ exampleText2 })}
									value={exampleText2}
								/>
								<TextControl
									help={__("This control is inline.", "wp-guten-options")}
									label={__("Example Text 3", "wp-guten-options")}
									onChange={(exampleText3) => this.setState({ exampleText3 })}
									value={exampleText3}
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody
							title={__("Panel Body Four", "wp-guten-options")}
							icon="admin-plugins"
						>
							<ToggleControl
								checked={exampleToggle}
								help={__("An example toggle.", "wp-guten-options")}
								label={__("Example Toggle", "wp-guten-options")}
								onChange={(exampleToggle) => this.setState({ exampleToggle })}
							/>
						</PanelBody>
						<Button
							isPrimary
							// isLarge
							onClick={() => {
								const {
									exampleSelect,
									exampleText,
									exampleText2,
									exampleText3,
									exampleToggle,
								} = this.state;

								const settings = new api.models.Settings({
									["wp_guten_options_select"]:
										exampleSelect,
									["wp_guten_options_text"]: exampleText,
									["wp_guten_options_text_2"]:
										exampleText2,
									["wp_guten_options_text_3"]:
										exampleText3,
									["wp_guten_options_toggle"]:
										exampleToggle ? "true" : "",
								});
								settings.save();

								dispatch("core/notices").createNotice(
									"success",
									__("Settings Saved", "wp-guten-options"),
									{
										type: "snackbar",
										isDismissible: true,
									}
								);
							}}
						>
							{__("Save", "wp-guten-options")}
						</Button>
					</Panel>
				</div>

				<div className="wp-guten-options__notices">
					<Notices />
				</div>
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
