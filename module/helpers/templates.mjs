/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  const {loadTemplates} = foundry.applications.handlebars;
  return loadTemplates([
    // Actor partials.
    'systems/hollyhearth/templates/actor/parts/actor-features.hbs',
    'systems/hollyhearth/templates/actor/parts/actor-items.hbs',
    'systems/hollyhearth/templates/actor/parts/actor-spells.hbs',
    'systems/hollyhearth/templates/actor/parts/actor-effects.hbs',
    // Item partials
    'systems/hollyhearth/templates/item/parts/item-effects.hbs',
  ]);
};
