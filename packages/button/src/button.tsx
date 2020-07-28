import { inject, computed, defineComponent, PropType } from "vue"
import { ElFormSymbol, ElFormItemSymbol, useGlobal } from "../../provides/index"
import concatClassName from "../../../src/tools/concatClassName"

const Button = defineComponent({
  name: "ElButton",
  props: {
    type: {
      type: String as PropType<
      "primary" | "success" | "warning" | "danger" | "info" | "text"
    >,
      default: "default"
    },
    size: {
      type: String as PropType<"medium" | "small" | "mini">,
      default: ""
    },
    icon: { type: String, default: "" },
    nativeType: { type: String, default: "button" },
    loading: { type: Boolean },
    disabled: { type: Boolean },
    plain: { type: Boolean },
    autofocus: { type: Boolean },
    round: { type: Boolean },
    circle: { type: Boolean },
  },
  setup(props, { attrs, slots }) {
    const elForm = inject(ElFormSymbol, null)
    const elFormItem = inject(ElFormItemSymbol, null)
    const elGlobalConfig = useGlobal()
    const buttonSize = computed(() => {
      return props.size || elFormItem?.elFormItemSize || elGlobalConfig?.size
    })
    const buttonDisabled = computed(() => {
      return props.disabled || elForm?.disabled
    })
    let classList = [
      "el-button",
      `el-button--${props.type}`,
      buttonSize.value ? "el-button--" + buttonSize.value : "",
      {
        "is-disabled": buttonDisabled.value,
        "is-loading": props.loading,
        "is-plain": props.plain,
        "is-round": props.round,
        "is-circle": props.circle
      }
    ]
    return () => (
      <button
        disabled={buttonDisabled.value || props.loading}
        autofocus={props.autofocus}
        type={props.nativeType as "button"}
        class={classList}
      >
        {props.loading && <i class="el-icon-loading"></i>}
        {props.icon && !props.loading && <i class={props.icon}></i>}
        {slots.default && <span>{slots.default?.()}</span>}
      </button>
    )
  }
})

export default Button