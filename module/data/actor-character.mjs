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

    // Iterate over approach names and create a new SchemaField for each.
    schema.approaches = new fields.SchemaField(Object.keys(CONFIG.HOLLY_HEARTH.approaches).reduce((obj, approach) => {
      obj[approach] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 2 }),
      });
      return obj;
    }, {}));

    // Iterate over skill names and create a new SchemaField for each.
    schema.skills = new fields.SchemaField(Object.keys(CONFIG.HOLLY_HEARTH.skills).reduce((obj, skill) => {
      obj[skill] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 3 }),
      });
      return obj;
    }, {}));

    return schema;
  }

  prepareDerivedData() {
    // Loop through ability scores, and add their modifiers to our sheet output.
    //for (const key in this.abilities) {
    //  // Handle ability label localization.
    //  this.abilities[key].label = game.i18n.localize(CONFIG.HOLLY_HEARTH.abilities[key]) ?? key;
    //}
  }

  getCheckData() {
    const data = {};
    data.appr = this.getApproachData();
    data.skill = this.getSkillData();

    return data
  }

  getApproachData() {
    const data = {}
    if (this.approaches) {
      for (let [k,v] of Object.entries(this.approaches)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    return data
  }

  getSkillData() {
    const data = {}
    if (this.skills) {
      for (let [k,v] of Object.entries(this.skills)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    return data
  }
}