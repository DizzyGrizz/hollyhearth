import HollyHearthDataModel from "./base-model.mjs";

export default class HollyHearthActorBase extends HollyHearthDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    schema.biography = new fields.HtmlField({ required: true, blank: true }); // equivalent to passing ({initial: ""}) for StringFields

    return schema;
  }

}