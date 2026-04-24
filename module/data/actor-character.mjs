import HollyHearthActorBase from "./base-actor.mjs";

export default class HollyHearthCharacter extends HollyHearthActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 })
      }),
    });

    // Iterate over ability names and create a new SchemaField for each.
    schema.abilities = new fields.SchemaField(Object.keys(CONFIG.HOLLY_HEARTH.abilities).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
      });
      return obj;
    }, {}));

    // Iterate over approach names and create a new SchemaField for each.
    schema.approaches = new fields.SchemaField(Object.keys(CONFIG.HOLLY_HEARTH.approaches).reduce((obj, approach) => {
      obj[approach] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max:2 }),
      });
      return obj;
    }, {}));

    // Iterate over skill names and create a new SchemaField for each.
    schema.skills = new fields.SchemaField(Object.keys(CONFIG.HOLLY_HEARTH.skills).reduce((obj, skill) => {
      obj[skill] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max:3 }),
        focuses: new fields.ArrayField(new fields.SchemaField({
          name: new fields.StringField(),
          expertise: new fields.ArrayField(new fields.StringField())
        }))
      });
      return obj;
    }, {}));

    return schema;
  }

  prepareDerivedData() {
    // Loop through ability scores, and add their modifiers to our sheet output.
    for (const key in this.abilities) {
      // Calculate the modifier using d20 rules.
      this.abilities[key].mod = Math.floor((this.abilities[key].value - 10) / 2);
      // Handle ability label localization.
      this.abilities[key].label = game.i18n.localize(CONFIG.HOLLY_HEARTH.abilities[key]) ?? key;
    }
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (this.abilities) {
      for (let [k,v] of Object.entries(this.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.lvl = this.attributes.level.value;

    return data
  }
}