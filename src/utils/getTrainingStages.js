export default function () {
    // access the training stages 
    // TODO training stages only for one level not multiple
    return _.flatten(dashboard_options.dashboard_stages)
        .map((d) => d.target_label.split(" ").join("-").toLowerCase());
}