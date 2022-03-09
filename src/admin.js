import { __ } from "@wordpress/i18n";
import api from "@wordpress/api";
import { render, Component } from "@wordpress/element";
import Notices from "./notices";
import { dispatch } from "@wordpress/data";
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
import "./admin.scss";

class App extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			optionSelect: "",
			optionText: "",
			optionText2: "",
			optionText3: "",
			optionToggle: false,
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
						optionSelect:
							response["wp_guten_options_select"],
						optionText:
							response["wp_guten_options_text"],
						optionText2:
							response["wp_guten_options_text_2"],
						optionText3:
							response["wp_guten_options_text_3"],
						optionToggle: Boolean(
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
			optionSelect,
			optionText,
			optionText2,
			optionText3,
			optionToggle,
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
			<>
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
								onChange={(optionSelect) => this.setState({ optionSelect })}
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
								value={optionSelect}
							/>
						</PanelBody>
						<PanelBody
							title={__("Panel Body Two", "wp-guten-options")}
							icon="admin-plugins"
						>
							<TextControl
								help={__("This is an example text field.", "wp-guten-options")}
								label={__("Example Text", "wp-guten-options")}
								onChange={(optionText) => this.setState({ optionText })}
								value={optionText}
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
									onChange={(optionText2) => this.setState({ optionText2 })}
									value={optionText2}
								/>
								<TextControl
									help={__("This control is inline.", "wp-guten-options")}
									label={__("Example Text 3", "wp-guten-options")}
									onChange={(optionText3) => this.setState({ optionText3 })}
									value={optionText3}
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody
							title={__("Panel Body Four", "wp-guten-options")}
							icon="admin-plugins"
						>
							<ToggleControl
								checked={optionToggle}
								help={__("An example toggle.", "wp-guten-options")}
								label={__("Example Toggle", "wp-guten-options")}
								onChange={(optionToggle) => this.setState({ optionToggle })}
							/>
						</PanelBody>
						<Button
							isPrimary
							// isLarge
							onClick={() => {
								const {
									optionSelect,
									optionText,
									optionText2,
									optionText3,
									optionToggle,
								} = this.state;

								const settings = new api.models.Settings({
									["wp_guten_options_select"]:
										optionSelect,
									["wp_guten_options_text"]: optionText,
									["wp_guten_options_text_2"]:
										optionText2,
									["wp_guten_options_text_3"]:
										optionText3,
									["wp_guten_options_toggle"]:
										optionToggle ? "true" : "",
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
			</>
		);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const htmlOutput = document.getElementById("wp-guten-options-settings");

	if (htmlOutput) {
		render(<App />, htmlOutput);
	}
});
