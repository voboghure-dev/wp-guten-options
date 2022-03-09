import { __ } from "@wordpress/i18n";
import {
	Panel,
	PanelBody,
	Placeholder,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
} from "@wordpress/components";
import { render, Component } from "@wordpress/element";
import "./customizer.scss";

const { api, customize } = wp;

class App extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			customizerSelect: "",
			customizerText: "",
			customizerText2: "",
			customizerToggle: false,
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
						customizerSelect: WPGutenCustomizer["wp_guten_customizer_select"],
						customizerText: WPGutenCustomizer["wp_guten_customizer_text"],
						customizerText2: response["wp_guten_customizer_text_2"],
						customizerToggle: Boolean(response["wp_guten_customizer_toggle"]),
						isAPILoaded: true,
					});
				});
			}
		});
	}

	render() {
		const {
			customizerSelect,
			customizerText,
			customizerText2,
			customizerToggle,
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
				<div className="wp-guten-customizer__main">
					<Panel>
						<PanelBody
							title={__("Panel Body One", "wp-guten-options")}
							icon="admin-plugins"
						>
							<SelectControl
								help={__("An example dropdown field.", "wp-guten-options")}
								label={__("Example Select", "wp-guten-options")}
								onChange={(customizerSelect) => {
									this.setState({ customizerSelect });
									customize.value("wp_guten_customizer_select")(
										customizerSelect
									);
								}}
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
								value={customizerSelect}
							/>
						</PanelBody>
						<PanelBody
							title={__("Panel Body Two", "wp-guten-options")}
							icon="admin-plugins"
						>
							<TextControl
								help={__("This is an example text field.", "wp-guten-options")}
								label={__("Example Text", "wp-guten-options")}
								onChange={(customizerText) => {
									this.setState({ customizerText });
									customize.value("wp_guten_customizer_text")(customizerText);
								}}
								value={customizerText}
							/>
						</PanelBody>
						<PanelBody
							title={__("Panel Body Three", "wp-guten-options")}
							icon="admin-plugins"
						>
							<TextControl
								help={__(
									"Use PanelRow to place controls inline.",
									"wp-guten-options"
								)}
								label={__("Example Text 2", "wp-guten-options")}
								onChange={(customizerText2) => {
									this.setState({ customizerText2 });
									customize.value("wp_guten_customizer_text_2")(
										customizerText2
									);
								}}
								value={customizerText2}
							/>
						</PanelBody>
						<PanelBody
							title={__("Panel Body Four", "wp-guten-options")}
							icon="admin-plugins"
						>
							<ToggleControl
								checked={customizerToggle}
								help={__("An example toggle.", "wp-guten-options")}
								label={__("Example Toggle", "wp-guten-options")}
								onChange={(customizerToggle) => {
									this.setState({ customizerToggle });
									customize.value("wp_guten_customizer_toggle")(
										customizerToggle
									);
								}}
							/>
						</PanelBody>
					</Panel>
				</div>
			</>
		);
	}
}

customize.bind("ready", function () {
	const panelKey = "wp-guten-customizer-panel";
	const sectionKey = "wp-guten-customizer-section";

	customize.panel.add(
		new customize.Panel(panelKey, {
			description: __("WP Gutenberg Example Panel", "wp-guten-options"),
			priority: 1000,
			title: __("WP Gutenberg Panel", "wp-guten-options"),
		})
	);
	customize.section.add(
		new customize.Section(sectionKey, {
			customizeAction: __("WP Gutenberg ▸ Section", "wp-guten-options"),
			panel: panelKey,
			title: __("WP Gutenberg Section", "wp-guten-options"),
		})
	);

	customize.control.add(
		new customize.Control("wp-guten-customizer-gutenberg-control", {
			section: sectionKey,
			type: "wp-guten-customizer-gutenberg-control",
		})
	);

	const htmlOutput = document.getElementById("wp-guten-customizer");
	if (htmlOutput) {
		render(<App />, htmlOutput);
	}
});
